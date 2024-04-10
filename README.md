# Pathfinder Visualizer

## What is this repo ?

This is a project uses simple typesciprt,html and css to visalize the path finding and mazification algorithms. The main highlight of this project is that this does not rely heavyly on the mordern framewroks like react, angular, etc.

### Alorithms used search

-   Depth First Search ([DFS](https://en.wikipedia.org/wiki/Depth-first_search)).
-   Breath First Search ([BFS](https://en.wikipedia.org/wiki/Breadth-first_search))
-   [A\*](https://en.wikipedia.org/wiki/A*_search_algorithm)

### Algorithms used for mazification

-   DFS Mazification

## Let's talk inputs

<!-- here there should a screenshot of inputs -->

-   The first Checkbox is to enable or disable the maze.
-   the next selection input is reposinsible for speed of the render/animation we have super fast, fast, medium, slow, super slow.(I personally prefer super fast 😅).
-   next we have a selection of search algoirthms. DFS, BFS and A\*.
-   next we have a button for changing the maze which will recompute the whole maze.
-   reset will just discard the search results and won't touch the maze, so the user can pick someother points from the existing maze.

## How to work on this locally

-   first clone the repo
-   peform `npm install` to install all dev dependencies.
-   then if you are working in src folder use `npm run start` to start the tsc watch.
-   if you are using VSCode then install the live-server extension to launch the `index.html` or you can install the `live-server` locally.
-   and you are good to go...!!

## Hosted Applications for you to playout with.

-   ### [Version1](https://n-harsha.github.io/Path-finding-visualizer/)
-   ### [Version2](https://path-finding-visualizer-ecru.vercel.app/)

    code for the respective version is the in the respective branches in this repo.

## How it looks👀 and functions🔥.

![Screenshot of mazification](https://github.com/N-Harsha/Path-finding-visualizer/assets/65081180/fd889683-4d0a-459a-984c-2e8d70c85b66)
![screenshot of bfs algorithm](https://github.com/N-Harsha/Path-finding-visualizer/assets/65081180/4a6a91c4-c2b4-4df0-80ad-8470f94cda84)
