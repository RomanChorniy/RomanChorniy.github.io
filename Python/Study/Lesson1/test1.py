message_text = 'Викликів - 12\nБійка - 1\nКрадіжка - 2\nДТП із травмованими зі скриттям(розкрито ЄО 9637) - 1\nПорушення ПДр - 4\nДомашнє насильство - 2\nКонфлікт - 2\nПостанови ПДР - 4'
message_text2 = 'Виклики -8\nПорушення ПДР-1\nПорушення тиші-1\nДтп б/п -2\nДомашнє насильство -1\nЗіх-2'
zvit = {
    ('Викликів', 'викликів', 'виклики'): 0,
    ('Порушення ПДР', 'порушення пдр'): 0,
    ('Бійка', 'бійка'): 0,
    ('Крадіжка', 'крадіжка'): 0,
    ('ДТП із травмованими', 'дтп із травмованими'): 0,
    ('Домашнє насильство', 'домашнє насильство'): 0,
    ('Конфлікт', 'конфлікт'): 0,
    ('Постанови ПДР', 'постанови пдр'): 0,
    ('Порушення тиші', 'порушення тиші'): 0,
    ('Дтп без травмованих', 'дтп без травмованих', 'дтп б/п'): 0,
    ('Звернення інформаційного характеру',
     'звернення інформаційного характеру', 'зіх'): 0,
}
print("\n" * 100)
print('------------>start<----------------')


def meke_list(inputText):
    message_text_list = inputText.split('\n')
    return message_text_list


def creat_dict(text):
    dict1 = {}
    list_data = meke_list(text)
    for i in list_data:
        i_smallList = i.split('-')
        key = i_smallList[0].rstrip().lower()
        value = int(i_smallList[1])
        dict1[key] = value
    return dict1


def find_new_zvit_position(zvit, new_dict):
    for key_new_dict in new_dict:
        print('Вибираємо елемент "', key_new_dict,
              '" з словника НОВИЙ---', sep='')
        key_addStatus = False
        print('Статус елемента "', key_new_dict,
              '" є - ', key_addStatus, sep='')
        for zvit_key in zvit:
            print('\tВибираємо кортеж "', zvit_key,
                  '" з словника ЗВІТ---', sep='')
            print('\t\tШукаємо елемент "', key_new_dict,
                  '" в кортежі "', zvit_key, '"', sep='')
            if key_new_dict in zvit_key:
                print('\t\t\tелемент "', key_new_dict,
                      '" ПРИСУТНІЙ в кортежі "', zvit_key, '"', sep='')
                key_addStatus = True
                zvit[zvit_key] = zvit[zvit_key]+new_dict[key_new_dict]
                print('\t\t\tСтатус елемента "', key_new_dict,
                      '" змнінено на - ', key_addStatus, "\n", sep='')
                break
            else:
                print('\t\t\tелементa "', key_new_dict,
                      '" НЕМАЄ в кортежі "', zvit_key, '"\n', sep='')
        if key_addStatus != True:
            print('-Елемент "', key_new_dict, '" не доданий')
            zvit[key_new_dict] = new_dict[key_new_dict]
            print('-Додаєм до словника Звіт новий елемент "', key_new_dict,
                  '" зі значенням "', new_dict[key_new_dict], '"', sep='')
            print('Оновлений словник Звіт - ', zvit)
        # print('-додаємо елемент "', key_new_dict, '" до словника ЗВІТ', sep='')


def make_string_from_dict(dict1):
    # Функція яка перетворить словник у текс для повідомлення у
    # телеграм-бот
    text = ''
    find_new_zvit_position(zvit, creat_dict(message_text))
    for key in dict1:
        if type(key) == tuple:
            text = text+key[0]+' - '+str(dict1[key])+'\n'
            continue
        text = text+key+' - '+str(dict1[key])+'\n'
    print("Функція make_string_from_dict - виконана")


make_string_from_dict(zvit)


# print(creat_dict(message_text))
# print(find_new_zvit_position(zvit, creat_dict(message_text)))
# print(creat_dict(message_text2))
# print(find_new_zvit_position(zvit, creat_dict(message_text2)))
# print('\n')
# print('Фінальний звіт')
# for key in zvit:
#     if type(key) == tuple:
#         print(key[0], zvit[key])
#         continue
#     print(key, zvit[key])
