Hello!

This is the repo for the Google Apps Script associated with the Bathtub Time Machine Google Sheet. Here's a little more info about how it all works:

(A) Collecting bathtub info - Scraped Home Depot (selected Bowie, MD) for bathtubs under 60 inches, capped it at 100 results and set a monitor on the site.
(B) Stored results in Airtable and Weaviate.
(C) Created a spreadsheet and Apps Script to send a user query from a cell to an endpoint.
(D) User's query is then leveraged for a hybrid search in Weaviate. Context is returned.
(E) User's query, and context are sent to OpenAI.
(F) Response is sent back to Apps Script.
(G) Secondary process similar to the above is executed to deliver the relevant URL for the selected tub.

Please note that responses can take a minute and the onEdit trigger is a bit fickle, once you select the cell for editing, write your query and hit enter. Again, results are limited to under 60 inches.

Cheers!
