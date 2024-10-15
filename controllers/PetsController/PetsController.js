const constants = require("../../const/constants");
const knex = require("knex")(require("../../knexfile"));

const getPetDetailsByID = async (req, res) => {
  try {
    const { id } = req.params;

    // Query the database for the pet by its ID, including shelter info
    const pet = await knex(constants.knex.pets)
      .select(
        "pets.id",
        "pets.name",
        "pets.age",
        "pets.breed",
        "pets.gender",
        "pets.images ",
        "pets.available ",
        "pets.size",
        "pets.vaccineStatus",
        "pets.price",
        "pets.description",
        "shelter.name as shelter_name",
        "shelter.address as shelter_address",
        "shelter.avatar as shelter_image",
        "shelter.status as shelter_status"
      )
      .leftJoin("shelter", "pets.shelter_id", "shelter.id")
      .where("pets.id", id)
      .first();

    // If no pet found, return a 404 error
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    // Format the response to match the structure needed
    const formattedPet = {
      id: pet.id,
      name: pet.name,
      age: pet.age,
      breed: pet.breed,
      gender: pet.gender,
      images: pet.images,
      size: pet.size,
      vaccineStatus: pet.vaccineStatus,
      price: pet.price,
      shelter: {
        name: pet.shelter_name,
        address: pet.shelter_address,
        image: pet.shelter_image,
        status: pet.shelter_status,
      },
      description: pet.description,
    };

    // Return the pet data in the response
    return res.status(200).json(formattedPet);
  } catch (error) {
    console.error("Error retrieving pet:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getPetDetailsByID,
};
