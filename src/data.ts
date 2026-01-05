export const data = {
    banners: [
        { img: '/assets/banners/banner-1.png', link: '', alt: 'Promoção Banner 1' },
        { img: '/assets/banners/banner-2.png', link: '', alt: 'Promoção Banner 2' },
        { img: '/assets/banners/banner-3.png', link: '', alt: 'Promoção Banner 3' },
        { img: '/assets/banners/banner-4.png', link: '', alt: 'Promoção Banner 4' },
    ],
    products: [
        { id: 1, label: 'Camisa PHP', price: 49.90, image: '/assets/products/camiseta-php.png', liked: false },
        { id: 2, label: 'Camisa Laravel', price: 39.90, image: '/assets/products/camiseta-laravel-branca.png', liked: false },
        { id: 3, label: 'Camisa Node', price: 29.90, image: '/assets/products/camiseta-node.png', liked: false },
        { id: 4, label: 'Camisa React', price: 19.90, image: '/assets/products/camiseta-react-azul.png', liked: false },
    ],
    product: {
        id: 1,
        label: 'Camisa PHP',
        images: [
            '/assets/products/camiseta-php.png',
            '/assets/products/camiseta-laravel-branca.png'
        ],
        price: 19.90,
        liked: false,
        description: 'Alguma descrição do produto'
    },
    addresses: [
        {id: 1, state: 'SP', zipcode: '12345', street: 'Rua Teste 1', number: '123', city: 'Cidade Qualquer', country: 'Pais' },
        {id: 2, state: 'MG', zipcode: '67890', street: 'Rua Teste 2', number: '456', city: 'Cidade Qualquer', country: 'Pais' },
        {id: 3, state: 'RS', zipcode: '04827', street: 'Rua Teste 3', number: '999', city: 'Cidade Qualquer', country: 'Pais' }
    ]
}