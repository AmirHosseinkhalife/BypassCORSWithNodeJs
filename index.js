const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    // صبر کردن برای بارگذاری صفحه به طور کامل
    await page.goto('https://siteName.com/', { waitUntil: 'networkidle2' });

    let index = 8;
    // ارسال درخواست POST با axios
    try {
        const response = await axios.post('https://siteName.com/api/search/provider', {
            categoryId: [],
            cities: [],
            sortBy: 'default',
            skip: index * 1001,
            take: 1001, //8197,
            query: '',
            radius: 3000,
            providerTypes: []
        }, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.9',
                'Content-Type': 'application/json',
                'Origin': 'https://siteName.com',
                'Referer': 'https://siteName.com/search/',
                'Sec-CH-UA': '"Chromium";v="135", "Not-A.Brand";v="8"',
                'Sec-CH-UA-Mobile': '?0',
                'Sec-CH-UA-Platform': '"Windows"',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
                'Cookie': '_gcl_au=1.1.1921334998.1744033526; shoken1=eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImNtOTc0ajJuajAwMWRnNGZkZzZpN3FhbjEifQ.Dc2bui0Za9qPcgOtx7cPXu7tVlSf4EFKM9vaLKtwUmw'
            }
        });

        // تبدیل داده‌ها به رشته JSON و ذخیره آن در فایل
        fs.writeFileSync(`response-${index}.json`, JSON.stringify(response.data, null, 2), 'utf-8');
        console.log('✅ Response saved to response.json');
    } catch (error) {
        console.error('❌ Error in API request:', error);
    }

    await browser.close();
})();
