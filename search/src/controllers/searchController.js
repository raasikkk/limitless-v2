export const search = async (req, res) => {
  try {
    res.status(200).json({
      message: "Search success",
    });
  } catch (error) {
    console.log(`Error occured at search(): ${error}`);
    res.status(500).json({
      error_message: error,
    });
  }
};
