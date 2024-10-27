#Your answer to the bonus tasks
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

# Strategy for Managing and Tracking Pipeline Status Changes

In order to handle updates to the pipeline statuses of acquisition targets, I set up a system where the targets.json file acts as a database. Each time a user changes a target’s status, the file is read, updated, and saved with the new data. This setup mimics a real database update, where each target has fields like id, pipelineStatus, and lastUpdated to track both the current status and the most recent update.

In a real-world production scenario, I'd most likely utilize a real database system (such as MongoDB or PostgreSQL) to ensure stability, consistency, and advanced capabilities like versioning. This would also allow me to create a change log to track updates, which could contain information such as the old status, the current status, and a timestamp for each change. This approach would be useful for auditing, where tracking updates is critical.

# Non-Trivial Edge Cases

I’ve taken a few potential edge cases into account to ensure a smooth user experience:

Duplicate Status Updates – If a user tries to set a status that the target already has, there's no need to send an update request to the server. I’ve added a simple check to skip updates in such cases, saving resources and reducing unnecessary processing.

Concurrency Edits – When multiple users are interacting with the same data, conflicts can arise. To handle this, I would implement the last updated timestamp as a quick way to check if the data on the server is newer than what’s on the user’s screen. If it is, we can notify the user and handle the change gracefully.

Network Failures - To improve UI performance, I would introduce an optimistic update that reflects changes in the user interface before verifying them on the server. If the server request fails, the UI restores to its prior state, and the user is informed of the issue.

Data Validation – To prevent invalid data from corrupting the system, I’ve included basic validation checks on both the front end and the back end to ensure only valid status values are accepted. This maintains data integrity and avoids unintended behavior.
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

# If there are items you didn't have time to implement, explain how you would approach the implementation.

#################################################################################
With more time, there are a few features I would have liked to add to make the application even more robust:

Audit Log for Status Changes: I’d set up a simple audit log (maybe as a change-log.json file) that records each status update, showing the old status, new status, who made the change, and when it happened. This would help keep track of all changes for better visibility.

User Authentication and Permissions: To control access, I’d add a basic login system with roles, so only authorized users can update statuses. Using something like NextAuth.js, I’d add permissions to API routes, allowing role-based access.

Bulk Actions: Adding checkboxes to select multiple items and a bulk action dropdown would make updating large numbers of targets easier. I’d bundle these into one request to keep things efficient.

Error Handling and Retry Logic: For cases where network issues prevent an update, I’d add a retry option so users can retry failed changes, or save them temporarily until the connection is stable.
,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
