import sys, csv, json
reader = csv.DictReader(open('properties.tsv', 'rU'), dialect=csv.excel_tab)
sys.stdout.write(json.dumps(list(reader)))
