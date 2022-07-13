import putout, {
    parse,
    print,
    traverse,
    generate,
    template,
    operator,
    types,
    transform,
    findPlaces,
} from 'putout';

const {assign} = Object;

assign(putout, {
    parse,
    print,
    traverse,
    generate,
    template,
    operator,
    transform,
    findPlaces,
    types,
});

export default putout;
export {
    parse,
    print,
    traverse,
    generate,
    template,
    operator,
    types,
    transform,
    findPlaces,
};

