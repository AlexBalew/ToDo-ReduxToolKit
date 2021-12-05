describe('taskExample', () => {
    it('base example, start condition', async () => {
        await
            page.goto('http://localhost:9009/iframe.html?id=taskexample--task-example&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchSnapshot();
    })
})

describe('addItemFormExample', () => {
    it('base example, start condition', async () => {
        await
            page.goto('http://localhost:9009/iframe.html?id=additemformexample--add-item-form-example&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchSnapshot();
    })
})

describe('addItemFormExample', () => {
    it('base example, start condition', async () => {
        await
            page.goto('http://localhost:9009/iframe.html?id=editablespanexample--editable-span-example&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchSnapshot();
    })
})

describe('addItemFormExample', () => {
    it('base example, start condition', async () => {
        await
            page.goto('http://localhost:9009/iframe.html?id=appexample--app-example&viewMode=story');
        const image = await page.screenshot();
        expect(image).toMatchSnapshot();
    })
})

