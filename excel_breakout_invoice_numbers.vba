Sub BreakoutInvoiceNumbers()
  'Break out invoice numbers
  Dim InvoicesColumn As String
  Dim Invoices As String
  Dim InvoiceRange() As String
  Dim sh As Worksheet
  Dim rw As Range
  Dim Invoice1 As Integer
  Dim Invoice2 As Integer
  Dim AddedInvoices As Integer
  Dim Rng As Range
  Dim Rng2 As Range
  Dim WorkRng As Range
  
  InvoicesColumn = "D"
  
  AddedInvoices = 0
  xTitleId = "Unpack Invoice Numbers"
  Set WorkRng = Application.Selection
  Set WorkRng = Application.InputBox("Range", xTitleId, WorkRng.Address, Type:=8)
  Set WorkRng = WorkRng.Columns(1)
  xLastRow = WorkRng.Rows.Count
  xLastRow = xLastRow + 1
  Debug.Print ("Last Row is: " & xLastRow)
  Application.ScreenUpdating = False
  For xRowIndex = xLastRow To 1 Step -1
    Set Rng = Range(InvoicesColumn & xRowIndex)
    Invoices = Rng.Value
    ' Debug.Print ("Row " & xRowIndex & ": invoices value is: " & Invoices)
'      Set sh = ActiveSheet
'     For Each rw In sh.Rows
'        Debug.Print ("Row is: " & rw.Row)
'      Next rw
    If InStr(1, Invoices, "-") Then
      InvoiceRange = Split(Invoices, "-")
      Debug.Print ("ROW " & xRowIndex & ": Invoice start is: " & InvoiceRange(0) & " and end is " & InvoiceRange(1))
      For xInvoiceNum = InvoiceRange(1) To InvoiceRange(0) Step -1
        Debug.Print ("ROW " & xRowIndex & ": GOT INVOICE: " & xInvoiceNum)
        'Rng.Offset(1, 0).EntireRow.Insert Shift:=xlDown
        Rng.Offset(1, 0).EntireRow.Insert Shift:=xlDown
        'Set Rng2 = Range(InvoicesColumn & xRowIndex)
        'Rng.Range("E" & xRowIndex - 1).Value = xInvoiceNum
        Rng.Offset(1, 1).Value = xInvoiceNum
        AddedInvoices = AddedInvoices + 1
      Next
    ' Set Rng = WorkRng.Range("R" & xRowIndex)
    ' If Rng.Value <> 0 Then
    '   Rng.Offset(1, 0).EntireRow.Insert Shift:=xlDown
     End If
  Next
  
  Application.ScreenUpdating = True
End Sub


