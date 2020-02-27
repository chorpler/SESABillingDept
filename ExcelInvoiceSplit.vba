Sub BreakOutInvoiceNumbers()
  'Break out invoice numbers
  Dim sh As Worksheet
  Dim rw As Range
  Dim RowCount As Integer
  Dim WorkRng As Range
  Dim InvoiceCell As String
  Dim InvoiceRange() As String

  RowCount = 0
  Set sh = ActiveSheet
  Application.ScreenUpdating = False
  For Each rw In sh.Row
    Set InvoiceString = sh.Cells(rw.Row, 3).Value
    InvoiceRange = Split(InvoiceString, "-")
  Next
  ' Dim Rng As Range
  ' On Error Resume Next
  ' Application.ScreenUpdating = False
  ' For xRowIndex = xLastRow To 1 Step - 1
  '   Set Rng = WorkRng.Range("A" & xRowIndex)
  '   If Rng.Value = "0" Then
  '     Rng.Offset(1, 0).EntireRow.Insert Shift:=xlDown
  '   End If
  ' Next
  Application.ScreenUpdating = True
End Sub

