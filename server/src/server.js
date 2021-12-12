import express from "express";
import cors from "cors";

const { PrismaClient } = require('@prisma/client');
const fetch = require('node-fetch');

const getGitHubUser = async (username) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const jsonData = await response.json();
  return jsonData
};

export function launch(port) {
  const prisma = new PrismaClient()
  const application = express();

  application.use(express.json())
  application.use(cors())
  
  application.get("/", (request, response) => {
    response.json("it's working..!");
  });

  application.get("/api/users/:username", async (request, response) => {
    
    const { username } = request.params
    const findUser = await prisma.user.findUnique({ where: { login: username } })

    if(findUser) {
      response.json({ user: { findUser } });
    }
    else {
      try {
        const data = await getGitHubUser(username)
        //console.log(data)

        const findUser = await prisma.user.create({
          data: {
            idGitHub: data.id,
            login: data.login,
            node_id: data.node_id,
            avatar_url: data.avatar_url,
            gravatar_id: data.gravatar_id,
            url: data.url,
            html_url: data.html_url,
            followers_url: data.followers_url,
            following_url: data.followers_url,
            gists_url: data.gists_url,
            starred_url: data.starred_url,
            subscriptions_url: data.subscriptions_url,
            organizations_url: data.organizations_url,
            repos_url: data.repos_url,
            events_url: data.events_url,
            received_events_url: data.received_events_url,
            type: data.type,
            site_admin: data.site_admin,
            name: data.name,
            company: data.company,
            blog: data.blog,
            location: data.location,
            email: data.email,
            bio: data.bio,
            twitter_username: data.twitter_username,
            public_repos: data.public_repos,
            public_gists: data.public_gists,
            followers: data.followers,
            following: data.following,
            created_at: data.created_at,
            updated_at: data.updated_at,
            hireable: data.hireable
          },
        })
        response.json({user: {findUser} })
      } catch (error) {
        console.log(error);
        const findUser = ""
        response.json({user: {findUser} })
      }
    
      

    }
    
  });
  
  application.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}