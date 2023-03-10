const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



// GET candidate info for profile page
router.get('/info', rejectUnauthenticated, (req, res) => {
  const sqlTxt = `SELECT * FROM
  candidate
    WHERE candidate.user_id = $1;`;

  pool.query(sqlTxt, [req.user.user_info.user_id])
    .then(dbRes => {
      res.send(dbRes.rows[0]);

    })
    .catch(error => {
      res.sendStatus(500);
    })
});



//GET Saved Candidate Jobs
router.get('/', rejectUnauthenticated, (req, res) => {

  const sqlTxt = `
    SELECT "job_post".id,"employer".company_name,"employer".company_address, "job_post".title
    FROM "saved_jobs"
    JOIN "job_post"
        ON "job_post".id = "saved_jobs".job_post_id
    JOIN "employer"
        ON "employer".id = "job_post".employer_id
    WHERE "saved_jobs".candidate_id = $1;`;


  pool.query(sqlTxt, [req.user.user_info.id])
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      res.sendStatus(500);
      console.log('error getting saved jobs: ', error);
    })
});

//GET Applied Candidate Jobs
router.get('/applied', rejectUnauthenticated, (req, res) => {

  const sqlTxt =

    `SELECT "application".id as application_id,"employer".company_name,"employer".company_address,"job_post".title, "application".status,"application"."time","job_post".id as job_post_id
     FROM "application"
     JOIN "job_post"
         ON "job_post".id = "application".job_post_id
     JOIN "employer"
         ON "employer".id = "job_post".employer_id
      WHERE "application".candidate_id = $1`;


  pool.query(sqlTxt, [req.user.user_info.id])
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      res.sendStatus(500);
      console.log('error getting saved jobs: ', error);
    })
});

//GET specific Job details Candidate
router.get('/detail/:id', rejectUnauthenticated, (req, res) => {
  const sqlTxt = `
    SELECT "job_post".id, "employer".company_name,"employer".company_address, "job_post".title, "job_post".description
    FROM "job_post"
    JOIN "employer"
        ON "employer".id = "job_post".employer_id
    WHERE "job_post".id = $1;`;


  pool.query(sqlTxt, [req.params.id])
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      res.sendStatus(500);
      console.log('error getting saved jobs: ', error);
    })
});

//DELETE Saved Jobs Candidate
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const sqlTxt = `
    DELETE 
    FROM saved_jobs 
    WHERE "candidate_id" = $1 AND "job_post_id" = $2;`;

  pool.query(sqlTxt, [req.user.user_info.id, req.params.id])
    .then(dbRes => {
      res.send(dbRes.rows);
    })
    .catch(error => {
      res.sendStatus(500);
      console.log('Delete Saved Jobs Failed: ', error);
    })
});



router.post('/:id/application', rejectUnauthenticated, (req, res) => {

  // initiate randomName variable. value will be assigned after axios
  let randomName = '';
  let animalList = 'https://www.randomlists.com/data/animals.json';
  let thingList = 'https://www.randomlists.com/data/things.json'

  const requestAnimal = axios.get(animalList);
  const requestThing = axios.get(thingList);

  // get animal and thing list at the same time
  axios.all([requestAnimal, requestThing])
    .then(axios.spread((...response) => {

      const responseAnimal = response[0].data.RandL.items
      const responseThing = response[1].data.RandL.items

      function pickRandom(list) {
        return list[Math.floor(Math.random() * list.length)];
      }
      // use pickRandom to select animal and thing. assign to randomName 
      randomName = pickRandom(responseAnimal) + " " + pickRandom(responseThing);
      console.log(randomName);

      // sqlTxt to insert application
      const sqlTxt = `INSERT INTO "application" ("candidate_id", "job_post_id", "random_identifier")
                        VALUES ($1, $2, $3);`;


      const sqlParams = [
        req.user.user_info.id,
        req.params.id,
        randomName
      ];

      pool.query(sqlTxt, sqlParams)
        .then((response) => {
          res.sendStatus(200);
        })

    })).catch(error => {
      console.log(error)
    });
});

//PUT Candidate Profile
router.put('/:id', rejectUnauthenticated, (req, res) => {

  const sqlTxt = `UPDATE "candidate"
                    SET "first_name" = $1,
                    "last_name" = $2,
                    "email" = $3,
                    "linkedin_link" = $4,
                    "resume_path" = $5,
                    "cover_letter_path" = $6
                    WHERE "id" = $7;`;

  const sqlParams = [
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.linkedin_link,
    req.body.resume_path,
    req.body.cover_letter_path,
    req.user.id
  ]

  pool.query(sqlTxt, sqlParams)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(500);
      console.log('PUT candidate info failed: ', error);
    })

});

router.put('/info/:id', rejectUnauthenticated, (req, res) => {

  const sqlTxt = `
  UPDATE "application"
  SET "status" = 'shared'
  WHERE "id" = $1;
  `;

  const sqlParams = [
    req.params.id
  ]

  pool.query(sqlTxt, sqlParams)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(500);
      console.log('POST candidate info failed: ', error);
    })

});

module.exports = router;