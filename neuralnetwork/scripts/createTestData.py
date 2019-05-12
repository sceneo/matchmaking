import random

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


numEntries = 10
index = 0
while index < numEntries:
    gender = pos_gender[random.randint(0,len_gender-1)]
    occupation = pos_occupation[random.randint(0,len_occupation-1)]
    
    print(gender + " " + occupation)
    index += 1

