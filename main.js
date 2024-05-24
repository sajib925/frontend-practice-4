document.addEventListener("DOMContentLoaded", function() {
    function fetchData(searchTerm) {
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => displayMeals(data))
        .catch(error => console.log(error));
    }

    function displayMeals(data) {
      var mealList = document.getElementById("mealList");
      mealList.innerHTML = "";
      if (data.meals) {
        data.meals.forEach(function(meal) {
          var mealItem = `
            <div class="col-md-4 mb-3">
              <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="Meal Image">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <button class="btn btn-info btn-sm viewDetails" data-toggle="modal" data-target="#mealModal" data-id="${meal.idMeal}">View Details</button>
                </div>
              </div>
            </div>`;
          mealList.innerHTML += mealItem;
        });
      } else {
        mealList.innerHTML = "<p>No meals found.</p>";
      }
    }

    document.getElementById("searchBtn").addEventListener("click", function() {
      var searchTerm = document.getElementById("searchInput").value;
      fetchData(searchTerm);
    });

    document.addEventListener("click", function(event) {
      if (event.target.classList.contains("viewDetails")) {
        var mealId = event.target.getAttribute("data-id");
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
          .then(response => response.json())
          .then(data => {
            var meal = data.meals[0];
            document.getElementById("modalMealName").textContent = meal.strMeal;
            document.getElementById("modalMealCategory").textContent = "Category: " + meal.strCategory;
            document.getElementById("modalMealInstructions").textContent = "Instructions: " + meal.strInstructions;
            document.getElementById("modalMealImage").src = meal.strMealThumb;
          })
          .catch(error => console.log(error));
      }
    });
  });
