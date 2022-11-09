const app = Vue.createApp({});

app.component("card-componnent", {
  data() {
    return {
      productAnalize: {
        salesPrice: 0,
        productPrice: 0,
        piece: 0,
        comisyon: 0,
        cargoPrice: 20,
        comisyonAndCardo: 0,
        total: 0,
      },
    };
  },

  methods: {
    sendMessageTelegram() {
      Swal.fire({
        title: "Ürünün Adını Nasıl Kayıt Edelim ?",
        input: "text",
        confirmButtonText: "Kaydet",
        preConfirm: (login) => {
          $.ajax({
            type: "GET",
            url: `https://api.telegram.org/bot5706240994:AAFtglDWXSYmoLNGvZ48_q-pHVNaRKMrDJA/sendMessage?chat_id=1372649086&text=
                    --------------------------------------------

                        Ürün Adı : ${login}

                        --------------------------------------------

                        Satış Fiyatı : ${this.productAnalize.salesPrice} ₺
                        --------------------------------------------
                        Ürün Fiyatı : ${this.productAnalize.productPrice} ₺
                        --------------------------------------------
                        Adet  : ${this.productAnalize.piece} Tane
                        --------------------------------------------
                        Komisyon : % ${this.productAnalize.comisyon}
                        --------------------------------------------
                        Kargo Fiyatı : ${this.productAnalize.cargoPrice} ₺
                        --------------------------------------------
                        Komisyon ve Kargo Fiyat Toplamı : ${this.productAnalize.comisyonAndCardo.toFixed(2)} ₺ 
                        --------------------------------------------
                        Total Kar : ${this.productAnalize.total.toFixed(2)} ₺
                    `,
          }).done((e) => {});
        },
      });
    },
  },
  template: `
  <div class="card">
  <div class="card-body">
    <div class="row text-center">
      <div class="col-sm-3 col-md-5">
        <label>Satış Fiyatı</label>
        <input v-model='productAnalize.salesPrice' :value='productAnalize.salesPrice' type="tel" class="mt-3 mb-3 form-control text-center" placeholder="Satış Fiyatı" />
      </div>

      <div class="col-sm-3 col-md-5">
        <label>Ürün Fiyatı</label>
        <input v-model='productAnalize.productPrice' :value='productAnalize.productPrice' type="tel" class="mt-3 mb-3 form-control text-center" placeholder="Ürün Fiyatı" />
      </div>

      <div class="col-sm-3 col-md-5">
      <label>Adet</label>
      <input v-model='productAnalize.piece' :value='productAnalize.piece' type="tel" class="mt-3 mb-3 form-control text-center" placeholder="Adet" />
    </div>

      <div class="col-sm-3 col-md-5">
         <label>% Komisyon</label>
         <input v-model='productAnalize.comisyon' :value='productAnalize.comisyon' type="tel" class="mt-3 mb-3 form-control text-center" placeholder="% Komisyon" />
      </div>

      <div class="col-sm-3 col-md-5">
         <label>Kargo Ücreti</label>
         <input v-model='productAnalize.cargoPrice' :value='productAnalize.cargoPrice' type="tel" class="mt-3 mb-3 form-control text-center" placeholder="Kargo Ücreti" />
      </div>

      <div class="col-sm-3 col-md-5">
         <label>Kargo Ve Komisyon Toplamı</label>
         <input :value='productAnalize.comisyonAndCardo.toFixed(2)' disabled type="number" class="mt-3 mb-3 form-control text-center"/>
      </div>


      
      <div class="col-sm-3 col-md-5">
         <label>Toplam Kar</label>
         <input :class='{ "bg-danger text-white": productAnalize.total < 0, "bg-success text-white": productAnalize.total > 0 }' :value='productAnalize.total.toFixed(2)' disabled type="number" class="mt-3 mb-3 form-control text-center"/>
      </div>

    </div>
  </div>
</div>


<div class='d-flex justify-content-center mt-3 mb-3'>
<button class='btn btn-info' @click='sendMessageTelegram'>Bilgileri Kaydet</button>

</div>
`,

  props: ["textdegeri"],

  watch: {
    productAnalize: {
      deep: true,
      handler(newValue) {
        newValue.comisyonAndCardo = newValue.salesPrice * (newValue.comisyon / 100) + newValue.cargoPrice;
        newValue.total = newValue.salesPrice - newValue.comisyonAndCardo - newValue.productPrice * newValue.piece;
      },
    },
  },
});

app.mount("#app");
