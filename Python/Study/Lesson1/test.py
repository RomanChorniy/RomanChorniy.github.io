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

# Функції.

# Відповідь на команду.


def start(update, context):
    context.bot.send_message(
        chat_id=update.effective_chat.id, text="Привіт. Я бот, поговори зі мною!")

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


# Сворюємо слухача.
start_handler = CommandHandler('start', start)
echo_handler = MessageHandler(Filters.text & (~Filters.command), echo)

# Додаємо Слухача в Диспечер
dispatcher.add_handler(start_handler)
dispatcher.add_handler(echo_handler)

updater.start_polling()
updater.idle()

# text = "152
# Виклики - 7
# ЗІХ - 2
# Надходження сигналу тривоги ЕЗК - 1
# Порушення ПДР - 3
# ДТП б/п - 1 (європротокол)
# Приводи-2(1 виконано)

# Постанови ПДР - 5
# Ел-5
# ч1ст122 - 5

# Протоколи ПДР - 1
# ч1ст130 - 1

# Постанови ГБ - 1
# Ел-1
# ч2ст44/3 - 1

# Самостіно створені - 2"
