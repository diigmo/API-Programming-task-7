import express from 'express';
var router = express.Router();

router.use(express.json())

var data = [
    {
        "id": 1,
        "forename": "Roy",
        "surname" : "Fielding"
    },
    
    {
        "id": 2,
        "forename": "Tim",
        "surname" : "Lee"
    },

]

router.get("/", function(req, res, next) {
    try {
        res.status(200).json(data)
    } catch( error ) {
        res.status(404).json({ error: "Data not found" });
    }

});

router.post('/', function(req, res, next) {
  let newdata = req.body
  console.log(newdata);
  const newDataFormat = req.headers["content-type"]
  switch(newDataFormat)
  {
    case "application/json":
    {
      if(
        ! newdata ||
        typeof newdata.forename !== 'string' ||
        typeof newdata.surname !== 'string' ||
        newdata.forename.trim() === '' ||
        newdata.surname.trim() === ''
      ) 
      {
          res.status( 422 ).json({ error: 'Unprocessable content.'})
      }
      else
      {
          newdata.id = Number(newdata.id)
          data.push(newdata)
          return res.status(201).send("Created" )
      }
    }
    default:
    {
       return res.status(415).send('Unsupported Media Type');
    }

  }

})


router.delete("/:id", (req, res, next) => {

  const id = Number(req.params.id);
  let itemIndex = data.findIndex(data => data.id === id)

  if (itemIndex === -1) {
    return res.status(404).send( 'ID not found' );
  }

  data.splice(itemIndex, 1); 
  res.status(204).send( "Deleted" );

});


router.put('/:id', function(req, res, next) {
  let newdata = req.body
  const id = Number(req.params.id);
  const newDataFormat = req.headers["content-type"]
  switch(newDataFormat)
  {
    case "application/json":
    {
      if(
        ! newdata ||
        typeof newdata.forename !== 'string' ||
        typeof newdata.surname !== 'string' ||
        newdata.forename.trim() === '' ||
        newdata.surname.trim() === ''
      ) 
      {
          res.status( 422 ).json({ error: 'Unprocessable content.'})
      }
      else
      {
        newdata.id = Number(newdata.id)
        let itemIndex = data.findIndex(data => data.id === id)
        if(itemIndex === -1)
        {  
          let newUser = {
                "id": id,
                "forename": newdata.forename,
                "surname": newdata.surname
          }
          data.push(newUser)
          return res.status(201).send( "Created" )
        }
        else 
        {
          data[itemIndex].forename = newdata.forename
          data[itemIndex].surname = newdata.surname
          return res.status(200).send( "OK" )
        }
      }
    }
    default:
    {
       return res.status(415).send('Unsupported Media Type');
    }

  }
})


router.post('/search', function(req, res, next) {
  let forename;
  let surname;
  let filtered = [];
  let result = [];
  if(req.body.forename !== undefined && typeof req.body.forename === "string")
  {
    forename = req.body.forename
  }
  if(req.body.surname !== undefined && typeof req.body.surname === "string")
  {
    surname = req.body.surname
  }

  if(forename !== undefined)
  {
      filtered = data.filter(data => data.forename === forename)
  }
  if(surname !== undefined)
  {
      filtered = data.filter(data => data.surname === surname)
  }
  if(filtered.length > 0)
  {
    for(let element of filtered)
      {
        let userInfo = { forename: "Name", surname: "Surname"}
        userInfo.forename = element.forename
        userInfo.surname = element.surname
        result.push(userInfo)
      }
    return res.status(200).json(result)
  }
  else
  {
    
    return res.status(404).json({ error: "User not found"});
  }

})




export default router;