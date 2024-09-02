# Local Guides Points Calculator 

This project is currently in progress 
This is built with intention of helping users on Google Map easily visualize how many of each contributions they need to make, helping users to reach their goals and be motivated.



# Layout 
Container- home and input (perform calculation here)
Component- user input form (url input, date selector component, filter, frequency)

# Ideas: 
Use useEffect hooks to trigger recalculations whenever the state changes or Submit button 


# User Input:
1. Date they want to reach points by
2. Their profile URL - must be public to work
We can fetch data by the URL using npm package installed from this repo https://github.com/jinwook-k/google-local-guides-api/tree/master
-users current points from that link
3. User can select which contribution type they want to focus on
[We need a filter that can be filtered/unfiltered]
4. Level user wants to attain how many total points user wants to obtain
5. How frequently they want to contribute per week


# Calculations


## Equal Distribution
1. A list of contribution type + points associated 
2. We filter that list by user selection
3. Then we see how many in that filtered list
4. From there, we can see how many points difference and divide by list.size and then divide that by points per category to get contributions needed per category (MVP will just be equal distribution among categories)
5. Divide that by user frequency so they can see bite sized chunk they need to obtain goal

## Weighted Distribution
Optional add on if we have time 
Smartly predict what users focus most on by looking at current contribution data:
1. Filter Current Contributions: First, fetch the user’s current contribution data from the Google Local Guides API for all categories.
2. Calculate Total Contributions in Selected Categories: If the user selects only "photos" and "videos," add up the contributions in these categories. Ignore contributions in other categories for the purpose of this calculation.
3. Calculate Percentages for Selected Categories: Determine the percentage contribution for each selected category relative to the total contributions in the selected categories.
4. Apply the Weighted Distribution: Distribute the required points based on these calculated percentages.

# Error handling
- profile URL should be valid 
-date selected can not be less than today's date
-they can't enter negative points or comma
-if they want to do it in less than 7 days- than they can't select frequency of say 7 x a week so that need to be check