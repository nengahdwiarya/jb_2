
document.addEventListener("DOMContentLoaded", function () {

  const menuGrid = document.getElementById("menuGrid");
  const searchMenu = document.getElementById("searchMenu");
  const sortMenu = document.getElementById("sortMenu");
  const categoryList = document.getElementById("categoryList");

  if (!menuGrid) {
    console.error("Elemen menuGrid tidak ditemukan!");
    return;
  }

  const menus = [
    { name: "Espresso", price: 18000, category: "coffee", icon: "☕" },
    { name: "Americano", price: 20000, category: "coffee", icon: "☕" },
    { name: "Cafe Latte", price: 25000, category: "coffee", icon: "🥛" },
    { name: "Cappuccino", price: 24000, category: "coffee", icon: "☕" },
    { name: "Es Kopi Susu Gula Aren", price: 22000, category: "coffee", icon: "🧋" },
    { name: "Caramel Macchiato", price: 28000, category: "coffee", icon: "☕" },

    { name: "Matcha Latte", price: 25000, category: "noncoffee", icon: "🍵" },
    { name: "Chocolate Milk", price: 22000, category: "noncoffee", icon: "🍫" },
    { name: "Strawberry Milk", price: 23000, category: "noncoffee", icon: "🍓" },

    { name: "Nasi Ayam Geprek", price: 15000, category: "food", icon: "🍗" },
    { name: "Nasi Ayam Bakar", price: 16000, category: "food", icon: "🍛" },
    { name: "Nasi Goreng Spesial", price: 14000, category: "food", icon: "🍚" },
    { name: "Nasi Goreng Seafood", price: 16000, category: "food", icon: "🍤" },
    { name: "Mie Goreng Spesial", price: 13000, category: "food", icon: "🍜" },
    { name: "Mie Ayam Bakso", price: 15000, category: "food", icon: "🍜" },
    { name: "Soto Ayam", price: 13000, category: "food", icon: "🥣" },

    { name: "Kentang Goreng", price: 8000, category: "snack", icon: "🍟" },
    { name: "Tahu Crispy", price: 7000, category: "snack", icon: "🍢" },
    { name: "Tempe Mendoan", price: 7000, category: "snack", icon: "🍘" },
    { name: "Pisang Goreng", price: 7000, category: "snack", icon: "🍌" },
    { name: "Cireng", price: 6000, category: "snack", icon: "🥟" },
    { name: "Roti Bakar Cokelat", price: 9000, category: "snack", icon: "🍞" },

    { name: "Pancake", price: 8000, category: "dessert", icon: "🥞" },
    { name: "Chocolate Cake", price: 12000, category: "dessert", icon: "🍰" },
    { name: "Ice Cream", price: 5000, category: "dessert", icon: "🍨" },
    { name: "Puding Cokelat", price: 5000, category: "dessert", icon: "🍮" }
  ];

  let activeCategory = "all";

  function formatRupiah(number) {
    return "Rp" + number.toLocaleString("id-ID");
  }

  function renderMenu() {
    let result = menus.filter(function (menu) {
      const matchCategory =
        activeCategory === "all" ||
        menu.category === activeCategory;

      const keyword = searchMenu
        ? searchMenu.value.toLowerCase().trim()
        : "";

      const matchSearch =
        menu.name.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });

    if (sortMenu) {
      if (sortMenu.value === "low") {
        result.sort((a, b) => a.price - b.price);
      } else if (sortMenu.value === "high") {
        result.sort((a, b) => b.price - a.price);
      } else if (sortMenu.value === "name") {
        result.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    if (result.length === 0) {
      menuGrid.innerHTML = `
        <p style="grid-column:1/-1;text-align:center;padding:30px;">
          Menu tidak ditemukan.
        </p>
      `;
      return;
    }

    menuGrid.innerHTML = result.map(function (menu) {
      return `
        <div class="menu-card">
          <div style="
            height:150px;
            display:flex;
            align-items:center;
            justify-content:center;
            background:#eee3d4;
            border-radius:12px;
            font-size:65px;
          ">
            ${menu.icon}
          </div>

          <div style="padding:14px;">
            <h3>${menu.name}</h3>
            <p style="font-weight:bold;color:#b68a52;">
              ${formatRupiah(menu.price)}
            </p>
            <button
              type="button"
              class="add-to-cart"
              data-name="${menu.name}"
              data-price="${menu.price}"
              style="
                width:100%;
                padding:11px;
                border:0;
                border-radius:25px;
                background:#38251d;
                color:white;
                cursor:pointer;
              "
            >
              + Tambah
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  if (searchMenu) {
    searchMenu.addEventListener("input", renderMenu);
  }

  if (sortMenu) {
    sortMenu.addEventListener("change", renderMenu);
  }

  if (categoryList) {
    categoryList.addEventListener("click", function (event) {
      const button = event.target.closest("[data-category]");
      if (!button) return;

      activeCategory = button.dataset.category;

      categoryList.querySelectorAll("[data-category]")
        .forEach(function (item) {
          item.classList.remove("active");
        });

      button.classList.add("active");
      renderMenu();
    });
  }

  // Tampilkan menu saat halaman dibuka
  renderMenu();

});
