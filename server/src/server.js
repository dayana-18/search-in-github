import express from "express";

import { PrismaClient } from '@prisma/client'
const fetch = require('node-fetch');

const fetchUser = async (username) => {
  const user = await fetch(`https://api.github.com/users/${username}`);
  console.log('jai fetch')
  return await user.json()
};

export function launch(port) {
  const prisma = new PrismaClient()
  const application = express();

  
  application.get("/", (request, response) => {
    response.json("it's working..!");
  });

  application.get("/api/users/:username", async (request, response) => {
    const { username } = request.params

    let user = await prisma.user.findUnique({where: { login: username} })

    if(user) {
      console.log("il y'a un user avec le bon username dans la db")
      response.json({ data: { user } })
    }
    const body = await fetchUser(username)
      console.log(body)
    
    const userdb = await prisma.user.create({
      data: {
        idGitHub: body.id,
        login: body.login,
        node_id: body.node_id,
        avatar_url: body.avatar_url,
        gravatar_id: body.gravatar_id,
        url: body.url,
        html_url: body.html_url,
        followers_url: body.followers_url,
        following_url: body.followers_url,
        gists_url: body.gists_url,
        starred_url: body.starred_url,
        subscriptions_url: body.subscriptions_url,
        organizations_url: body.organizations_url,
        repos_url: body.repos_url,
        events_url: body.events_url,
        received_events_url: body.received_events_url,
        type: body.type,
        site_admin: body.site_admin,
        name: body.name,
        company: body.company,
        blog: body.blog,
        location: body.location,
        email: body.email,
        bio: body.bio,
        twitter_username: body.twitter_username,
        public_repos: body.public_repos,
        public_gists: body.public_gists,
        followers: body.followers,
        following: body.following,
        created_at: body.created_at,
        updated_at: body.updated_at,
        hireable: body.hireable
      },
    })
    response.json(userdb)

  });
  
  application.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
}