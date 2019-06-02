import random
import csv

pos_gender = ["male", "female", "else"]
pos_occupation = ["Student", "Purchaser", "Marketing Manger", "Sales Manager"]
pos_type = ["Exhibitor", "Visitor"]

pos_hometown = ["Munich", "Nurnberg", "Bremen", "Berlin", "Hamburg", "Cologne", "Duesseldorf", "Vienna", "Paris", "London"]
pos_industry = ["Construction", "IT", "Consulting", "Craft","Beauty"]


len_gender = len(pos_gender)
len_occupation = len(pos_occupation)
len_type = len(pos_type)
len_hometown = len(pos_hometown)
len_industry = len(pos_industry)


with open('../data/testdata/testdata.csv', 'w') as csvFile:
    with open('../data/testdata/testdatanumeric.csv', 'w') as csv_numeric_file:
        writer = csv.writer(csvFile)
        numeric_writer = csv.writer(csv_numeric_file)

        numEntries = 100
        index = 0
        while index < numEntries:
            gender_rnd = random.randint(0, len_gender-1)
            gender = pos_gender[gender_rnd]

            occupation_rnd = random.randint(0, len_occupation-1)
            occupation = pos_occupation[occupation_rnd]

            type_rnd = random.randint(0, len_type-1)
            type = pos_type[type_rnd]

            hometown_rnd = random.randint(0, len_hometown-1)
            hometown = pos_hometown[hometown_rnd]

            industry_rnd = random.randint(0, len_industry-1)
            industry = pos_industry[industry_rnd]

            writer.writerow([gender, occupation, type, hometown, industry])
            numeric_writer.writerow(
                [gender_rnd, occupation_rnd, type_rnd, hometown_rnd, industry_rnd])

            index += 1

print("Test data created.")
