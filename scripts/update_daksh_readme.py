from pathlib import Path

content = """<div align="center">
    <h3><code>daksh043@github ~ $ ./github-activity --calamansi</code></h3>
    <img src="./github-activity-card.svg" width="860" />
    <br><br>
    <h3><code>daksh043@github ~ $ whoami</code></h3>
    <table>
        <tr>
            <td valign="top"><img src="./avi-ascii.svg" width="370" /></td>
            <td valign="top"><img src="./info-card.svg" width="490" /></td>
        </tr>
    </table>
</div>
"""

Path("../daksh043/README.md").write_text(content, encoding="utf-8")
print("README written successfully!")
