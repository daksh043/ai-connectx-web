"""
AI Connect X — AI Engine (OpenAI + Gemini switchable)

All AI-powered features: Company Research, Relevance Scoring, 
Collaboration Ideas, Message Generation, Tone Engine, Quality Checker,
Reply Classification.
"""
import json
from typing import Optional
from app.config import settings

# ─── Provider Abstraction ────────────────────────────────────────

async def _call_llm(system_prompt: str, user_prompt: str, json_mode: bool = False) -> str:
    """Route to the configured AI provider."""
    if settings.AI_PROVIDER.lower() == "gemini":
        return await _call_gemini(system_prompt, user_prompt, json_mode)
    else:
        return await _call_openai(system_prompt, user_prompt, json_mode)


async def assistant_chat(message: str, context: Optional[dict] = None) -> dict:
    """Answer workspace questions and return lightweight next-step suggestions."""
    system_prompt = f"""You are the AI Connect X workspace assistant.
{AI_CONNECTX_CONTEXT}
Help the user plan campaigns, research companies, qualify prospects, and write thoughtful outreach.
Be concise, practical, and transparent. Never claim an action was completed unless the application did it.
Return JSON with exactly two fields: message (string) and suggested_actions (array of short strings).
Workspace context: {json.dumps(context or {}, default=str)}"""
    result = await _call_llm(system_prompt, message, json_mode=True)
    try:
        parsed = json.loads(result)
        return {
            "message": parsed.get("message", result),
            "suggested_actions": parsed.get("suggested_actions", []),
        }
    except json.JSONDecodeError:
        return {"message": result, "suggested_actions": []}


async def generate_automation(prompt: str) -> dict:
    """Turn a plain-language outreach goal into a saved-workflow draft."""
    system_prompt = """Design a safe outreach automation for AI Connect X.
Return JSON only with: name, description, trigger_type, conditions, actions, approval_mode, confidence_threshold.
Use trigger_type values new_prospect, message_received, followup_due, campaign_match.
Use action_type values research_company, qualify_prospect, generate_draft, notify_owner, schedule_followup.
Default approval_mode to approval_required and confidence_threshold to 85.
Never choose automatic sending."""
    result = await _call_llm(system_prompt, prompt, json_mode=True)
    try:
        return json.loads(result)
    except json.JSONDecodeError:
        return {
            "name": "New outreach workflow",
            "description": prompt,
            "trigger_type": "new_prospect",
            "conditions": [],
            "actions": [{"action_type": "generate_draft", "config": {"instruction": prompt}}],
            "approval_mode": "approval_required",
            "confidence_threshold": 85,
        }


async def _call_openai(system_prompt: str, user_prompt: str, json_mode: bool = False) -> str:
    """Call OpenAI API."""
    from openai import AsyncOpenAI
    client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    kwargs = {
        "model": "gpt-4o",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "temperature": 0.7,
        "max_tokens": 2000,
    }
    if json_mode:
        kwargs["response_format"] = {"type": "json_object"}
    response = await client.chat.completions.create(**kwargs)
    return response.choices[0].message.content


async def _call_gemini(system_prompt: str, user_prompt: str, json_mode: bool = False) -> str:
    """Call Google Gemini API."""
    import google.generativeai as genai
    genai.configure(api_key=settings.GEMINI_API_KEY)
    model = genai.GenerativeModel(
        settings.GEMINI_MODEL,
        system_instruction=system_prompt,
    )
    full_prompt = user_prompt
    if json_mode:
        full_prompt += "\n\nIMPORTANT: Respond ONLY with valid JSON, no markdown."
    response = model.generate_content(full_prompt)
    return response.text


# ─── AI Connect X Knowledge Base ─────────────────────────────────

AI_CONNECTX_CONTEXT = """
AI Connect X is a student-led technology community at the university focused on:
- Connecting students with the tech industry
- Organizing workshops, hackathons, guest lectures
- Building partnerships with companies for internships, mentorships, and live projects
- Creating hands-on learning experiences in AI, ML, web development, and emerging tech
- Growing a vibrant community of tech-enthusiastic students

AI Connect X has:
- An active student community
- Experience organizing tech events
- Connections with university faculty and administration
- A track record of successful industry collaborations

When reaching out to companies, AI Connect X offers:
- Access to motivated, tech-savvy students
- Event organization and logistics
- University infrastructure and facilities
- Marketing and promotion to the student community
- Potential for talent pipeline and recruitment
"""


# ─── Company Research ────────────────────────────────────────────

async def research_company(company_name: str, company_info: dict) -> dict:
    """Generate an AI research brief for a company."""
    system_prompt = f"""You are an AI research assistant for AI Connect X.
{AI_CONNECTX_CONTEXT}

Analyze the given company and produce a detailed research brief.
Respond in JSON with these fields:
- research_summary: 2-3 paragraph overview of the company
- relevance_score: float 0-100
- relevance_reasoning: why this company is relevant to AI Connect X
- collaboration_areas: list of specific collaboration types that fit
- technologies: list of technologies they work with
- recent_activity: any notable recent activity
"""
    user_prompt = f"""Research this company:
Name: {company_name}
Info: {json.dumps(company_info, default=str)}

Provide a thorough research brief."""

    result = await _call_llm(system_prompt, user_prompt, json_mode=True)
    try:
        return json.loads(result)
    except json.JSONDecodeError:
        return {"research_summary": result, "relevance_score": 50}


# ─── Qualification / Relevance ───────────────────────────────────

async def qualify_prospect(company_info: dict, campaign_info: dict) -> dict:
    """Score how well a company matches a campaign's criteria."""
    system_prompt = f"""You are the AI qualification engine for AI Connect X.
{AI_CONNECTX_CONTEXT}

Evaluate how well a company matches the given campaign criteria.
Respond in JSON:
- qualification_score: float 0-100
- qualification_reasoning: detailed explanation of the score
- collaboration_ideas: list of 3-5 specific collaboration ideas
"""
    user_prompt = f"""Company: {json.dumps(company_info, default=str)}
Campaign: {json.dumps(campaign_info, default=str)}

Score this company for the campaign and suggest collaboration ideas."""

    result = await _call_llm(system_prompt, user_prompt, json_mode=True)
    try:
        return json.loads(result)
    except json.JSONDecodeError:
        return {"qualification_score": 50, "qualification_reasoning": result}


# ─── Collaboration Idea Generator ────────────────────────────────

async def generate_collaboration_ideas(company_info: dict, collaboration_type: Optional[str] = None) -> list:
    """Generate specific collaboration ideas for a company."""
    system_prompt = f"""You are the collaboration strategist for AI Connect X.
{AI_CONNECTX_CONTEXT}

Generate specific, actionable collaboration ideas between AI Connect X and the given company.
Each idea should include a title, description, format (workshop/lecture/hackathon/etc.), 
estimated duration, and value proposition for both parties.

Respond in JSON: {{ "ideas": [...] }}
"""
    type_hint = f"\nPreferred collaboration type: {collaboration_type}" if collaboration_type else ""
    user_prompt = f"""Company: {json.dumps(company_info, default=str)}{type_hint}

Generate 5 creative, specific collaboration ideas."""

    result = await _call_llm(system_prompt, user_prompt, json_mode=True)
    try:
        parsed = json.loads(result)
        return parsed.get("ideas", [])
    except json.JSONDecodeError:
        return [{"title": "Collaboration", "description": result}]


# ─── LinkedIn Message Generator ──────────────────────────────────

async def generate_linkedin_message(
    company_info: dict,
    contact_info: dict,
    collaboration_idea: Optional[str],
    tone: str = "professional",
    previous_messages: list = None,
) -> str:
    """Generate a personalized LinkedIn message."""
    system_prompt = f"""You are the outreach message writer for AI Connect X.
{AI_CONNECTX_CONTEXT}

Write a LinkedIn connection message / InMail. Rules:
- Keep it SHORT (under 300 characters for connection note, under 1000 for InMail)
- Be genuinely personal — reference the person's role, company, and specific work
- Propose a clear, specific collaboration
- Sound human, NOT like a template or AI
- Tone: {tone}

AVOID:
- "I hope this message finds you well"
- Excessive corporate language
- Fake enthusiasm
- Long paragraphs
- Generic AI phrases
- Repeated templates

Just return the message text, nothing else."""

    prev = ""
    if previous_messages:
        prev = f"\nPrevious messages in this thread:\n{json.dumps(previous_messages, default=str)}\n"

    idea = f"\nCollaboration idea: {collaboration_idea}" if collaboration_idea else ""

    user_prompt = f"""Recipient: {json.dumps(contact_info, default=str)}
Company: {json.dumps(company_info, default=str)}{idea}{prev}

Write a personalized LinkedIn message."""

    return await _call_llm(system_prompt, user_prompt)


# ─── Email Generator ─────────────────────────────────────────────

async def generate_email(
    company_info: dict,
    contact_info: dict,
    collaboration_idea: Optional[str],
    tone: str = "professional",
    previous_messages: list = None,
) -> dict:
    """Generate a personalized email with subject line."""
    system_prompt = f"""You are the email outreach writer for AI Connect X.
{AI_CONNECTX_CONTEXT}

Write a professional outreach email. Structure:
1. Compelling subject line
2. Personal opening (reference their work/company)
3. Why we're reaching out
4. Brief intro of AI Connect X
5. Specific collaboration proposal
6. Value for their company
7. Simple CTA
8. Signature

Rules:
- Be specific and genuine
- Keep it concise (under 250 words)
- Sound human, NOT like a template
- Tone: {tone}

Respond in JSON: {{ "subject": "...", "body": "..." }}"""

    prev = ""
    if previous_messages:
        prev = f"\nPrevious messages:\n{json.dumps(previous_messages, default=str)}\n"

    idea = f"\nCollaboration idea: {collaboration_idea}" if collaboration_idea else ""

    user_prompt = f"""Recipient: {json.dumps(contact_info, default=str)}
Company: {json.dumps(company_info, default=str)}{idea}{prev}

Write a personalized email."""

    result = await _call_llm(system_prompt, user_prompt, json_mode=True)
    try:
        return json.loads(result)
    except json.JSONDecodeError:
        return {"subject": "Collaboration Opportunity — AI Connect X", "body": result}


# ─── Follow-up Generator ─────────────────────────────────────────

async def generate_followup(
    company_info: dict,
    contact_info: dict,
    previous_messages: list,
    followup_number: int,
    channel: str = "email",
) -> str:
    """Generate a follow-up message."""
    system_prompt = f"""You are writing a follow-up message for AI Connect X.
{AI_CONNECTX_CONTEXT}

This is follow-up #{followup_number}. Rules:
- Reference the previous message
- Add new value or information
- Keep it shorter than the original
- Don't be pushy
- Sound genuinely interested, not desperate
- Channel: {channel}

Just return the message text."""

    user_prompt = f"""Contact: {json.dumps(contact_info, default=str)}
Company: {json.dumps(company_info, default=str)}
Previous messages: {json.dumps(previous_messages, default=str)}

Write follow-up #{followup_number}."""

    return await _call_llm(system_prompt, user_prompt)


# ─── Reply Classifier ────────────────────────────────────────────

async def classify_reply(inbound_message: str, context: dict) -> dict:
    """Classify an inbound reply and suggest next action."""
    system_prompt = """Analyze this reply to an outreach message.

Classify into one of:
- interested
- needs_information
- needs_approval
- not_interested
- wrong_person
- follow_up_later
- meeting_requested
- opt_out

Respond in JSON:
{
    "sentiment": "...",
    "confidence": 0.0-1.0,
    "suggested_action": "description of what to do next",
    "suggested_reply": "draft reply if appropriate"
}"""

    user_prompt = f"""Inbound message: "{inbound_message}"
Context: {json.dumps(context, default=str)}

Classify this reply."""

    result = await _call_llm(system_prompt, user_prompt, json_mode=True)
    try:
        return json.loads(result)
    except json.JSONDecodeError:
        return {"sentiment": "needs_information", "suggested_action": result}


# ─── Message Quality Checker ─────────────────────────────────────

async def check_message_quality(message: str, context: dict) -> dict:
    """Check if a message is personalized and high quality."""
    system_prompt = """You are a message quality checker for outreach messages.

Evaluate the message on these criteria:
- personalization: Does it mention the specific company/person?
- relevance: Does the collaboration match the company?
- length: Is it appropriate length? (short/appropriate/long)
- generic_language: Does it use generic/AI-sounding phrases? (true = bad)
- clear_cta: Is there a clear call to action?
- duplicate_wording: Any repeated phrases? (true = bad)

Respond in JSON:
{
    "personalization": true/false,
    "relevance": true/false,
    "length": "short|appropriate|long",
    "generic_language": true/false,
    "clear_cta": true/false,
    "duplicate_wording": true/false,
    "overall_score": 0-100,
    "reasoning": "why this message works or doesn't"
}"""

    user_prompt = f"""Message to check:
"{message}"

Context: {json.dumps(context, default=str)}"""

    result = await _call_llm(system_prompt, user_prompt, json_mode=True)
    try:
        return json.loads(result)
    except json.JSONDecodeError:
        return {"overall_score": 70, "reasoning": result}


# ─── Company Discovery (AI-powered) ──────────────────────────────

async def discover_companies(criteria: dict) -> list:
    """Use AI to suggest companies matching campaign criteria."""
    system_prompt = f"""You are a company discovery engine for AI Connect X.
{AI_CONNECTX_CONTEXT}

Based on the given criteria, suggest real companies that could be good collaboration partners.
For each company provide:
- name
- website (if known)
- industry
- location
- size (estimate)
- description
- technologies
- why_relevant: why they'd be a good fit

Respond in JSON: {{ "companies": [...] }}

IMPORTANT: Suggest real companies when possible. If unsure, generate realistic examples."""

    user_prompt = f"""Find companies matching:
{json.dumps(criteria, default=str)}

Suggest {criteria.get('count', 10)} companies."""

    result = await _call_llm(system_prompt, user_prompt, json_mode=True)
    try:
        parsed = json.loads(result)
        return parsed.get("companies", [])
    except json.JSONDecodeError:
        return []
