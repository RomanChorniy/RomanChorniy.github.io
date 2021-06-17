import telegram
import logging
from telegram.ext import Updater
from telegram.ext import CommandHandler
from telegram.ext import MessageHandler
from telegram.ext import Filters

bot = telegram.Bot(token='1699383271:AAEXNIzryOcO0QpcfRthwp7oNAb6QZcZR8U')
updater = Updater(
    token='1699383271:AAEXNIzryOcO0QpcfRthwp7oNAb6QZcZR8U')
dispatcher = updater.dispatcher
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)
zvit_for_user = str()
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
     'звернення інформаційного характеру', 'зіх'): 0
}
# Функції.

# Відповідь на команду.


def start(update, context):
    context.bot.send_message(
        chat_id=update.effective_chat.id, text="Привіт. Я бот, поговори зі мною!")


def zero(update, context):
    for key in zvit:
        zvit[key] = 0
    context.bot.send_message(
        chat_id=update.effective_chat.id, text="Звіт очищено")

# Ехо-функція.


def echo(update, context):
    context.bot.send_message(
        chat_id=update.effective_chat.id, text=update.message.text)
    message_text = update.message.text
    message_text_list = message_text.split('\n')

    dict1 = {}
    for i in message_text_list:
        i_smallList = i.split('-')
        dict1[i_smallList[0]] = i_smallList[1]
        print(i_smallList)
    print(message_text)
    print(type(message_text))
    # print(dict1)
    # print(dict1['Конфлікт '])
    # print(message_text)
    # print(type(message_text))
    # print(message_text_list)
    # print(type(message_text_list))
    # print(message_text_list[5])

# Програма Бот-Звіт


def make_zvit(update, context):
    # Функція виведення загального звіту-словника
    find_new_zvit_position(zvit, creat_dict(update))
    context.bot.send_message(
        chat_id=update.effective_chat.id, text=make_string_from_dict(zvit))


def meke_list(inputText):
    # тут створюємо список для словника із функції creat_dict.
    message_text_list = inputText.split('\n')
    return message_text_list


def creat_dict(update):
    # Функція яка приймає текст повідомлення користувача і
    # перетворює це повідомлення на словник
    dict1 = {}
    text = update.message.text
    list_data = meke_list(text)
    for i in list_data:
        i_smallList = i.split('-')
        key = i_smallList[0].rstrip().lower()
        value = int(i_smallList[1])
        dict1[key] = value
    print('Функція creat_dict - виконанна')
    return dict1


def find_new_zvit_position(zvit, new_dict):
    # Функція для створення звіт, порівнюючи словник zvit та
    # словик new_dict із повідомення користувача.
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
    return zvit


def make_string_from_dict(dict1):
    # Функція яка перетворить словник у текс для повідомлення у
    # телеграм-бот
    text = ''
    for key in dict1:
        if type(key) == tuple:
            text = text+key[0]+' - '+str(dict1[key])+'\n'
            continue
        text = text+key+' - '+str(dict1[key])+'\n'
    print("Функція make_string_from_dict - виконана")
    print(text)
    return text


# Сворюємо слухача.
# start_handler = CommandHandler('start', start)
# echo_handler = MessageHandler(Filters.text & (~Filters.command), echo)
zvit_handler = MessageHandler(Filters.text & (~Filters.command), make_zvit)
zero_handler = CommandHandler('zero', zero)

# Додаємо Слухача в Диспечер
# dispatcher.add_handler(start_handler)
# dispatcher.add_handler(echo_handler)
dispatcher.add_handler(zvit_handler)
dispatcher.add_handler(zero_handler)

updater.start_polling()
updater.idle()
