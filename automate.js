let regexes = [
  {
    find: "[ \t]*\n",
    replace: "\n",
    description: "",
  },
  {
    find: "[ ]+",
    replace: " ",
    description: "",
  },
  {
    find: "^[ \t]+(.*)$",
    replace: "\1",
    description: "",
  },
  {
    find: "(ae|am|ap|bd|bm|bn|bp|od|oft|rs) *(\d+\.\d+(?:\s*pt\.?\d)?\.txt)\n(?:[\:\-\/\.\#,\@\+\w\s]*?(Authorization number)\: *(\d{10})\s*[\w \:\n,\(\/\-\.\#\t]*\))",
    replace: "\1 \2\n◊~~~~~~~~~~~~~~~~~~~~◊\nItem\tTechnician\tUnit No.\tOrder No.\tHrs\tAuth   No.\t\4\n◊~~~~~~~~~~~~~~~~~~~~◊\n",
    description: "",
  },
  {
    find: "\n(\d+) (\d{6,10}|COST CENTER|ISO \d{3,8}) ([A-Za-z. éáóíñ]*) (\d+\.\d+) *\/ *H \d+\.\d\d USD(?: *550420\/order\/(1014210015|\d{8,10}|\d{3,4}) (\d+)\(100\.00\%\)| *550420\/Cost center\/(1014210015|\d{3,10}|\d+ \d+) *\(100\.00\%\))",
    replace: "\n\1\t\3\t\2\t\5\6\7\t\4",
    description: "",
  },
  {
    find: "(?:(\s*\"?Item.*\))?(\s*SESA\s*\d*\s*\n?)?(\n*\s*Page\s*\d*\s*OF\s*\d*\s*)(\s*\"?Item\n?#\"?\s*)?(\s*Vendor\s*Service\s*Number\s*)?(\s*Service\s*M.{2,8}\sNumber\s*)?(\s*Description\s*Quantity\s*\/\s*)?(\s*Unit\s*\"?Estimated\s*Total\s*\n*)?(\s*Item\s*Price\"?\s*)?(\s*Cost\s*Object\s*)?(\s*\(?GL\s*\/\s*Category\s*\/\s*Cost\s*Object\)?)?)",
    replace: "\n",
    description: "",
  },
  {
    find: "(item\s*.*\n*)+\)",
    replace: "\n",
    description: "",
  },
  {
    find: "\n *SESA.*\n",
    replace: "\n",
    description: "",
  },
  {
    find: "\nPre-authorization document - \d+\n",
    replace: "\n",
    description: "",
  },
  {
    find: "([ \t ]*\n)+",
    replace: "\n",
    description: "",
  },
  {
    find: "===================================================================",
    replace: "\n============\n\n",
    description: "",
  },
  {
    find: "(ae|am|ap|bd|bm|bn|bp|od|oft|rs) *(\d+\.\d+(?:\s*pt\.?\d)?\.txt)\n◊~~~~~~~~~~~~~~~~~~~~◊",
    replace: "\1 \2\n",
    description: "",
  },
  {
    find: "◊~~~~~~~~~~~~~~~~~~~~◊\n",
    replace: "\n",
    description: "",
  },
  {
    find: "^(\d+)[ ](N/A |NA )?(\w\. \w+)[ ]",
    replace: "\1 00000000 \3 ",
    description: "",
  },
  {
    find: "\n(\d+) (\d{6,10}|COST CENTER )([A-Za-z. éáóíñ]*) (\d+\.\d+) *\/ *H \d+\.\d\d USD(?: *550420\/order\/(1014210015|\d{8,10}|\d{3,4}) (\d+)\(100\.00\%\)| *550420\/Cost center\/(1014210015|\d{3,10}|\d+ \d+) *\(100\.00\%\))",
    replace: "\n\1\t\3\t\2\t\5\6\7\t\4",
    description: "",
  },
  {
    find: "[ ]*\t[ ]*",
    replace: "\t",
    description: "",
  },
];