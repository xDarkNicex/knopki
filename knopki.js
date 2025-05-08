const { Bot, InlineKeyboard } = require('grammy');


require('dotenv').config();
const bot = new Bot(process.env.BOT_TOKEN);


function getMainKeyboard() {
    return new InlineKeyboard()
        .text('🛠 Создание бота', 'option1')
        .text('📦 Ресурсы', 'option2')
        .row()
        .text('📞 Контакты', 'contacts')
        .text('❓ Помощь', 'help');
}


bot.command('start', (ctx) => {
    ctx.reply('👋 Привет! Выберите одну из опций ниже:', {
        reply_markup: getMainKeyboard()
    });
});


bot.command('help', (ctx) => {
    ctx.reply(
        'ℹ️ *Помощь*\n\n' +
        'Используйте кнопки для взаимодействия с ботом.\n\n' +
        'Команды:\n' +
        '/start — начать заново\n' +
        '/help — справка',
        { parse_mode: 'Markdown' }
    );
});


bot.on('callback_query:data', async (ctx) => {
    const data = ctx.callbackQuery.data;

    switch (data) {
        case 'option1':
            await ctx.answerCallbackQuery();
            await ctx.reply(
                '🛠 *Как создать Telegram-бота*\n\n' +
                '1. Напиши @BotFather в Telegram\n' +
                '2. Используй команду `/newbot` и следуй инструкциям\n' +
                '3. Получи токен и вставь его в свой код\n' +
                '4. Напиши бота на Node.js с библиотекой `grammy`\n' +
                '5. Запусти бота с помощью `node bot.js`',
                { parse_mode: 'Markdown' }
            );
            break;

        case 'option2':
            await ctx.answerCallbackQuery();
            await ctx.reply(
                '📦 *Полезные ресурсы для изучения:*\n\n' +
                '— [Официальная документация Telegram](https://core.telegram.org/bots/api)\n' +
                '— [Документация grammy](https://grammy.dev/)\n' +
                '— [Курс по Node.js](https://www.freecodecamp.org/learn)\n' +
                '— [Telegram Dev Chat](https://t.me/BotTalk)',
                { parse_mode: 'Markdown', disable_web_page_preview: true }
            );
            break;

        case 'contacts':
            await ctx.answerCallbackQuery();
            await ctx.reply(
                '📞 *Контакты разработчика:*\n\n' +
                '— Telegram: @\n' +
                '— GitHub: https://github.com/xDarkNicex\n' +
                '— Email: example@gmail.com',
                { parse_mode: 'Markdown', disable_web_page_preview: true }
            );
            break;

        case 'help':
            await ctx.answerCallbackQuery();
            await ctx.reply(
                '🔍 *Справка*\n\n' +
                'Нажмите на одну из кнопок выше, чтобы получить информацию по теме.\n\n' +
                'Если что-то не работает — перезапустите бота командой /start.',
                { parse_mode: 'Markdown' }
            );
            break;

        default:
            await ctx.answerCallbackQuery('Неизвестная опция', { show_alert: true });
            break;
    }
});


bot.on('message', (ctx) => {
    ctx.reply('⚠️ Неизвестная команда. Используйте /start или выберите кнопку ниже.', {
        reply_markup: getMainKeyboard()
    });
});


bot.start({
    drop_pending_updates: true,
    onStart: () => console.log('✅ Бот успешно запущен...')
});
