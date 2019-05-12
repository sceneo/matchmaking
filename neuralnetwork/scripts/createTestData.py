import random
import csv

pos_gender = ["male", "female", "else"]
pos_occupation = ["Student", "Purchaser", "Marketing Manger", "Sales Manager"]
pos_type = ["Exhibitor", "Visitor"]
pos_hometown = ["Munich", "Nurnberg", "Bremen", "Berlin", "Hamburg", "Cologne", "Duesseldorf", "Vienna", "Paris", "London"]
pos_industry = ["Construction", "IT", "Consulting", "Craft" "Beauty"]

len_gender = len(pos_gender)
len_occupation = len(pos_occupation)
len_type = len(pos_type)
len_hometown = len(pos_hometown)
len_industry = len(pos_industry)


with open('../data/testdata/testdata.csv', 'wb') as csvFile:
    writer = csv.writer(csvFile)  
    
    numEntries = 10000
    index = 0
    while index < numEntries:
        gender = pos_gender[random.randint(0,len_gender-1)]
        occupation = pos_occupation[random.randint(0,len_occupation-1)]
        type = pos_type[random.randint(0,len_type-1)]
        hometown = pos_hometown[random.randint(0,len_hometown-1)]
        industry = pos_industry[random.randint(0,len_industry-1)]

        writer.writerow([gender, occupation, type, hometown, industry])
        index += 1

print("Test data created.")
