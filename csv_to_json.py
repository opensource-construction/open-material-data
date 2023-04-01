import argparse
import csv
import json
import os
import time

def parse_arguments():
    parser = argparse.ArgumentParser(description='Convert CSV rows to JSON files and create an index file.')
    parser.add_argument('input_csv', help='Input CSV file.')
    parser.add_argument('output_folder', help='Output folder for JSON files.')
    parser.add_argument('name_reference', help='Column name used as the JSON filename.')
    return parser.parse_args()

def read_csv(input_csv):
    with open(input_csv, 'r') as csvfile:
        reader = csv.DictReader(csvfile)
        rows = [row for row in reader]
    return rows

def write_json_files(rows, output_folder, name_reference):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    index_data = []
    file_list = []
    for row in rows:
        if name_reference in row:
            filename = f"{row[name_reference]}.json"
            file_path = os.path.join(output_folder, filename)
            with open(file_path, 'w') as jsonfile:
                json.dump(row, jsonfile)
            index_data.append(row)
            file_list.append(os.path.join(output_folder, filename))
        else:
            print(f"Error: '{name_reference}' column not found in row.")
            return

    return len(rows), index_data, file_list

def write_index_file(index_data, output_folder):
    index_file_path = os.path.join(output_folder, 'index.json')
    with open(index_file_path, 'w') as index_file:
        json.dump(index_data, index_file)

def write_list_index_file(file_list, output_folder):
    list_index_file_path = os.path.join(output_folder, 'list.json')
    with open(list_index_file_path, 'w') as list_index_file:
        json.dump(file_list, list_index_file)

def main():
    args = parse_arguments()

    start_time = time.time()

    try:
        rows = read_csv(args.input_csv)
    except FileNotFoundError:
        print(f"Error: File '{args.input_csv}' not found.")
        return

    num_files_written, index_data, file_list = write_json_files(rows, args.output_folder, args.name_reference)

    if num_files_written:
        write_index_file(index_data, args.output_folder)
        write_list_index_file(file_list, args.output_folder)
        end_time = time.time()
        time_elapsed = end_time - start_time
        print(f"{num_files_written} files written to {args.output_folder} in {time_elapsed:.2f} seconds. Index file and list index file created.")

if __name__ == '__main__':
    main()
