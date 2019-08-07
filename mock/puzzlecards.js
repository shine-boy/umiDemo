const random_jokes = [
  {
    ID: 1,
    title: 'What is the object oriented way to get wealthy ?',
    content: 'Inheritance',
  },
  {
    ID: 2,
    title: 'To understand what recursion is...',
    content: "You must first understand what recursion is",
  },
  {
    ID: 3,
    title: 'What do you call a factory that sells passable products?',
    content: 'A satisfactory',
  },
];

let random_joke_call_count = 0;

export default {
  'get /dev/random_joke': function (req, res) {
    const responseObj = random_jokes;

    setTimeout(() => {
      res.json(responseObj);
    }, 3000);
  },
  'post /dev/random_joke': function (req, res) {

    random_jokes.push({ ...req.body });
    res.send(random_jokes);
  },
  'put /dev/random_joke': function (req, res) {
    const id=req.body.ID;
    random_jokes.map((item) => {
      if (item.ID === id) {
        item.title = req.body.title;
        item.content = req.body.content;
      }
    });
    
    res.send(random_jokes);
    
  },
  'delete /dev/random_joke': function (req, res) {
    
    const id=parseInt(req.query.ID);
    
    
    
    const date=random_jokes.filter(joke => joke.ID !== id);
    
    res.send(date);
    
  },
};