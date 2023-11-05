const utilityMixin = {
    toBootstrapSelectCompatibleData(
        items: any[],
        valueKey: string,
        textKey: string
    ) {
        return items.map((item) => ({
            value: item[valueKey],
            text: item[textKey],
        }));
    },

    toItemSectionSearchType(type: string) {
        let _type = 'items_for_sale';
        if (type === 'item_for_sale') {
            _type = 'items_for_sale';
        } else if (type === 'want_to_buy') {
            _type = 'want_to_buys';
        }

        return _type;
    },
};

export default utilityMixin;
