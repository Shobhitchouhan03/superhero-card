let input = document.querySelector("input");
let btn = document.querySelector("button");
let result = document.querySelector(".result");
let wrapper = document.querySelector(".wrapper");

async function fetchData() {
    let searchValue = input.value.trim().toLowerCase();

    if (searchValue === "") {
        result.textContent = "Please enter superhero name!";
        return;
    }

    try {
        let res = await fetch("./data.json");
        let data = await res.json();

        let hero = data.superheroes.find(
            (ele) => ele.name.toLowerCase() === searchValue
        );

        if (hero) {
            result.innerHTML = `
                <h1 class="hero-name">${hero.name}</h1>
                <img id="heroImg" class="hero-img" src="${hero.image}">
                <h2 class="hero-power"><b>Power:</b> ${hero.superpower}</h2>
                <h2 class="hero-abilities"><b>Abilities:</b> ${hero.abilities.join(", ")}</h2>
            `;

            let img = document.getElementById("heroImg");

            img.addEventListener("load", () => {
                wrapper.classList.add("active");
            });

        } else {
            result.textContent = "Hero not found!";
            wrapper.classList.remove("active");
        }

    } catch (err) {
        console.log(err);
        result.textContent = "Error fetching data!";
    }

    input.value = "";
}

btn.addEventListener("click", fetchData);

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        fetchData();
    }
});