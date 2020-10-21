*** TO DO ***
1. Better Design
2. When we type on Form it was calling component multiple times better 
   use REF instead of local state

*** MAJOR IMPLEMENTATION ***
1.Get field details of only logged in Users (This is DAMN important )
   a. Implemented for Field, Tratcor, Labour data
   DONE

*** TODO: TACKLE IN END ***
1. Lazy load Comps 
2. Need to have Notifications so that USER will know what's happening when
   he/she performs actions.
3. Add image in Dashboard.
4. Move all edit & update logic out of components, do it in context indeed.

*** IN PROGRESS ****
1. Code Refactoring 

*** BUG ***
1. Delete & Edit functionalities for Labour

*** FIXED ***
1. Add Public and Private Route (rightnow all routes are accessible)
2. Auth state persistence on browser refresh
3. Some major BUGS in EXPEND details of Tractor & Labour (Values are duplicated) 
   Reason => (Firebase Context was used dependency)
4. On Mobile view fix forms & Navbar