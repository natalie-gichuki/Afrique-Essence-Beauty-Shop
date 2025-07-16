import csv
from io import StringIO
from flask import make_response

def export_to_csv(data, headers, filename):
    si = StringIO()
    writer = csv.DictWriter(si, fieldnames=headers)
    writer.writeheader()
    writer.writerows(data)
    output = make_response(si.getvalue())
    output.headers["Content-Disposition"] = f"attachment; filename={filename}"
    output.headers["Content-type"] = "text/csv"
    return output
