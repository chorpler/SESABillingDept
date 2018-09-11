# Convert/setup Pre-Auth PDF Data for copy/paste to a template


Iterate through the three sections below with the appropriate find/replace 
     1. copy everything between the `/` characters at the beginning and end of the search expressions
     2. make sure regular expressions is selected in the options to the left of `Find:` (the `🞻` symbol)
     3. it is not necessary to save or save and close the files during the process...
Finally from the cleaned up text files: copy/paste the pre-auth info into the appropriate Excel invoice template

### Clean

**NEW**

---

#### Remove all leading spaces at the beginning of new lines

<pre>
<b>This text has no leading spaces</b>
  <b>this text has two leading spaces</b> (typical indentation using spaces for 1 tab)
    <b>this text has 4 leading spaces</b> or the equivelent of 2 tab indentation using spaces (2 spaces/tab)
</pre>

Sublime Text and most other text(code) editors allow you to select a block of text to set indentation.
Select the block of text (must be at least two lines of text);
Use: `TAB` to increase indentation (leading spaces or tabs)
use: `SHFT+TAB` to decrease indentation

We want all of the leading spaces removed in the `output.txt` file.  This simplifies the *regex* expressions
  - all of the following regex expressions are constructed such that every new line (`\n`) is followed by any character except a space
  - following the above description select the block of text to *decrease the indentation*
  - Since we want all of the text, our "block of text" is the entire contents of the `output.txt` file.
  - We select the entire contents with the keyboard shortcut `CTRL+A` (you shoule see the entire contents highlighted now)
  - Use `SHFT+TAB` to decrease the indentation (by holding down the `SHFT+TAB` the command is repeated until all leading spaces are removed)

#### Bonus

The above section is written because indenting or un-indenting blocks of text is useful and does not require `regex` expressions in `Find/Replace` to accomplish since it is
almost always used in coding or text-only documents to *visually* structure the text.  However, in the next section *"Begin: Find and Replace"* the first `regex` expression removes trailing spaces or `TAB`(s) after text and before the newline `\n`.  The square brackets `[]` creates a group of characters which can be found in any order.  The `*` after the closing bracket `]` means that you will select "zero to as many as exist" of these characters" and in this expression: `/[ \t]*\n/`, *zero or more spaces or tabs before a newline* (these are called trailing spaces since they trail normal text at the end of a line).  Since we are already using regular expressions to parse the pre-auth data in `output.txt`, how would you re-write the expression 

```js
/[ \t]*\n[ \t]*/
```

to include leading as well as trailing spaces (or tabs) at the beginning and ends of every line?


---

## START HERE

#### First remove all leading spaces
- `ctrl+a` to select all text
- `Shift+Tab` to remove all leading spaces

* #### Begin: Find and Replace
  ```js
  Find:
  /[ \t]*\n/
  Replace:
  /\n/
  ```

  ```js
  Find:
  /[ ]+/
  Replace:
  / /
  ```
  
* #### Auth No.
  
  ```js
  Find:
  /(ae|am|ap|bd|bn|bp|od|rs) *(\d+\.\d+(?:\s*pt\.?\d)?\.txt)\n(?:[\:\-\/\.\#,\@\+\w\s]*?(Authorization number)\: *(\d{10})\s*[\w \:\n,\(\/\-\.\#\t]*\))/
  Replace:
  /\1 \2\n◊~~~~~~~~~~~~~~~~~~~~◊\nItem\tTechnician\tUnit No.\tOrder No.\tHrs\tAuth   No.\t\4\n◊~~~~~~~~~~~~~~~~~~~~◊\n/
  ```
  
* #### item no. woNum, unit No. Tech, Hrs ...
  
  ```js
  Find:
  /\n(\d+) (\d{6,10}|COST CENTER )([A-Za-z. éáóíñ]*) (\d+\.\d+) *\/ *H \d+\.\d\d USD(?: *550420\/order\/(1014210015|\d{8,10}|\d{4}) (\d+)\(100\.00\%\)| *550420\/Cost center\/(1014210015|\d{4,10}|\d+ \d+) *\(100\.00\%\))/
  Replace:
  /\n\1\t\3\t\2\t\5\6\7\t\4/
  ```
  
* #### Remove table headers and page no. stuff
  
  ```js
  Find:
  /(?:(\s*\"?Item.*\))?(\s*SESA\s*\d*\s*\n?)?(\n*\s*Page\s*\d*\s*OF\s*\d*\s*)(\s*\"?Item\n?#\"?\s*)?(\s*Vendor\s*Service\s*Number\s*)?(\s*Service\s*M.{2,8}\sNumber\s*)?(\s*Description\s*Quantity\s*\/\s*)?(\s*Unit\s*\"?Estimated\s*Total\s*\n*)?(\s*Item\s*Price\"?\s*)?(\s*Cost\s*Object\s*)?(\s*\(?GL\s*\/\s*Category\s*\/\s*Cost\s*Object\)?)?)/
  Replace: 
  /\n/
  ```

  ```js
  Find:
  /(item\s*.*\n*)+\)/
  Replace:
  /\n/
  ```

  ```js
  Find:
  /\n *SESA.*\n/
  Replace:
  /\n/
  ```

  ```js
  Find:
  /\nPre-authorization document - \d+\n/
  Replace:
  /\n/
  ```
  
  ```js
  // repeat this to remove all extra lines
  Find:
  /[ \t]*\n+/
  Replace:
  /\n/
  ```

* #### Clean-up for excel:
  ```js
  Find:
  /===================================================================/
  Replace:
  /\n============\n\n/
  
  Find:
  /(ae|am|ap|bd|bn|bp|od|rs) *(\d+\.\d+(?:\s*pt\.?\d)?\.txt)\n◊~~~~~~~~~~~~~~~~~~~~◊/
  Replace:
  /\1 \2\n/
  
  Find:
  /◊~~~~~~~~~~~~~~~~~~~~◊/
  Replace:
  //
  ```
  
* #### Clean up any records that were missed earlier (usually missing unit number before name)
  
  ```js
  Find:
  /^(\d+)[ ]/
  Replace:
  /\1 00000000 /
  
  Find:
  /\n(\d+) (\d{6,10}|COST CENTER )([A-Za-z. éáóíñ]*) (\d+\.\d+) *\/ *H \d+\.\d\d USD(?: *550420\/order\/(1014210015|\d{8,10}|\d{4}) (\d+)\(100\.00\%\)| *550420\/Cost center\/(1014210015|\d{4,10}|\d+ \d+) *\(100\.00\%\))/
  Replace:
  /\n\1\t\3\t\2\t\5\6\7\t\4/
  ```

* #### Final cleanup of extra spaces
  
  ```js
  Find:
  /[ ]*\t[ ]*/
  Replace:
  /\t/
  ```
