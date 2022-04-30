const bookValidation = async (req, res, next) => {
  try { 
    const { title, author, year, about, category, copy } = req.body;
    if (!title) {
      return res.json({ vError: "title should be at least one word" });
    } else if (!author) {
      return res.json({ vError: "author should be at least one word" });
    } else if (!about) {
      return res.json({ vError: "about should be at least one word" });
    }

    if (about.length > 3000) {
      console.log(about.length);
      return res.json({ vError: "about should not longer then 700 word" });
    }

    // if(years){
    //   const int = parseInt(year);
    //   const years = year.toString();
    //   const check = int == year && years.length == 4;
    //   console.log(check);
    //   if (!check) {
    //     return res.json("year should be 4 digit valid number only");
    //   }
    // }
    
    req.valid = { title, author, year, about, category, copy };
    next();

  } catch (error) {
    next(error);
    return;
  }
};
module.exports = bookValidation;
