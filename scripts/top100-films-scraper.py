# To install the required dependencies, use 'pip install lxml requests'
from lxml import html
import requests

# Download the rotten tomatoes top 100.
page = requests.get("https://www.rottentomatoes.com/top/bestofrt/")

# Load the page content as an xml tree, then find the heading of the ranking table,
# then use that to get the 100 table itself...
tree = html.fromstring(page.content)
table_heading = tree.xpath("//table//th[text()='Rank']")
table = tree.xpath("//table//th[text()='Rank']/parent::tr/parent::thead/parent::table")

# If we can't find the table, bail out.
if len(table) != 1:
    raise ValueError(
        "Unable to unambiguously find the top 100 table, the "
        "page structure has likely changed since the script was written..."
    )

# Now print a heading and a row for each film.
print('"Rank","Rating","Title","Reviews"')
for tr in table[0].xpath("./tr"):
    # Get the table divisions. For each one, we can get the actual cell data.
    tds = tr.getchildren()

    # Translate ranks from '94.' -> '94'.
    rank = tds[0].text.strip().replace('.', '')

    # Translate percentages from '98%' -> '98'.
    rating = tds[1].xpath(".//span[contains(@class, 'tMeterScore')]")[0].text.strip().replace('%', '')

    # Grab the title and strip whitespace.
    title = tds[2].xpath("./a")[0].text.strip()

    # Get the reviews. That's all the data we need.
    reviews = tds[3].text.strip()

    # Write the row.
    print(f'"{rank}","{rating}","{title}","{reviews}"')
