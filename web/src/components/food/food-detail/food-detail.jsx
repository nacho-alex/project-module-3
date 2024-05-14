

function FoodDetail({ food }) {

    return (
      <>
          <div className="workout-detail-container">
            <div className='workout-detail-box'>
                <div className="workout-image">
                    <i>{food.emoji}</i> 
                </div>
                <div className="workout-text">
                    <h1>{food.emoji} {food.name}</h1>
                    <p>Calories (kcal):<span>{food.calories_kcal}</span></p>
                    <p>Carbohydrates (g):<span>{food.carbohydrates_g}</span></p>
                    <p>Protein (g):<span>{food.protein_g}</span></p>
                    <p>Total fat (g):<span>{food.totalFat_g}</span></p>
                    <p>Saturated fat (g):<span>{food.saturatedFat_g}</span></p>
                    <p>Total sugar (g):<span>{food.totalSugar_g}</span></p>
                    <p>Total fiber (g):<span>{food.totalFiber_g}</span></p>
                    <p>Cholesterol (mg):<span>{food.cholesterol_mg}</span></p>
                    <p>Vitamin A (iu):<span>{food.vitaminA_iu}</span></p>
                    <p>Vitamin B12 (ug):<span>{food.vitaminB12_ug}</span></p>
                    <p>Vitamin C (mg):<span>{food.vitaminC_mg}</span></p>
                    <p>Vitamin D (iu):<span>{food.vitaminD_iu}</span></p>
                    <p>Calcium (g):<span>{food.calcium_g}</span></p>
                    <p>Iron (mg):<span>{food.iron_mg}</span></p>
                    <p>Magnesium (mg):<span>{food.magnesium_mg}</span></p>
                    <p>Phosphorus (g):<span>{food.phosphorus_g}</span></p>
                    <p>Potassium_g (g):<span>{food.potassium_g}</span></p>
                </div>
            </div>
      </div>
      </>
    )
  }
  export default FoodDetail;