document.addEventListener("alpine:init", () => {
    Alpine.data('pizzaCart', () => {
        return {
            title: 'Pizza Cart API',
            pizzas: [],
            username: 'NoonAK-N',
            cartId: '',
            cartPizzas: [],
            cartData: [],
            cartTotal: 0.00,
            paymentAmount: 0,
            message:'',
            pizza: '',
            createCart() {
                const getCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/create?username=${this.username}`
                return axios.get(getCartURL);
                },           


            getCart() {
                const getCarturl = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartId}/get`
                return axios.get(getCarturl);

            },
            addPizza(PizzaId) {

                return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/add', {
                    "cart_code": this.cartId,
                    "pizza_id": PizzaId

                });
            },
            removePizza(PizzaId) {

                return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/remove', {
                    "cart_code": this.cartId,
                    "pizza_id": PizzaId

                });
            },
            pay(amount) {
                return axios.post('https://pizza-api.projectcodex.net/api/pizza-cart/pay',

                    {
                        "cart_code": this.cartId,
                        "amount": amount
                    }); 
            },
            showCartData() {
                this.getCart().then(result => {
                    this.cartData = result.data.pizzas;
                    // console.log(this.cartData)


                    const cartData = result.data
                    this.cartPizzas = cartData.pizzas;
                    this.cartTotal = cartData.total.toFixed(2);
                    // alert(this.cartTotal);

                });

            },


            init() {
                axios
                    .get('https://pizza-api.projectcodex.net/api/pizzas')
                    .then(result => {

                        this.pizzas = result.data.pizzas;
                        //console.log(">>" + this.pizzas);
                    });
                    if (!this.cartId) {
                        this
                            .createCart()
                            .then((result) => { 
                                this.cartId = result.data.cart_code;
                                this.showCartData();
                            })
                    }

            },
            addPizzaToCart(PizzaId) {
                // alert(PizzaId)
                this.addPizza(PizzaId)
                    .then(() => {
                        this.showCartData();
                    });
            },
            removePizzaFromCart(PizzaId) {
                // alert(PizzaId)
                this.removePizza(PizzaId)
                    .then(() => {
                        this.showCartData();
                    });

            },
            payForCart() {
                // alert("Pay now : "+ this.paymentAmount)
                this
                .pay(this.paymentAmount)
                .then(result => {
                    if ( result.data.status == 'failure') {
                        this.message = result.data.message;
                        setTimeout(() => this.message= '', 3000);
                    } else {
                    this.message = 'Payment Received, Enjoy!';

                    setTimeout(() => {
                    this.message = '';
                    this.cartPizzas = [];
                    this.cartTotal = 0.00
                    this.cartId = ''
                    }, 3000);

                    }
            });
            }

        }
    });

});
