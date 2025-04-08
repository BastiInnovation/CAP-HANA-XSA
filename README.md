CAP Prototype
=============

This project does not contain any real business logic but provides a starting point for evaluating technical issues or features.
It can also be a base for sample projects for issue explanations and therefore should not grow too much in its main branch!

The `scripts` folder contains shell scripts for easy (re-/un-)deployment. (Un)subscription currently has to be done manually since the BTP APIs
do not offer the full feature set for respective automation tasks.

## Current feature set

* AppRouter integration
* VDM generation from edmx
* Nest.js bootstrapping
* CAP/Nest.js-integration
* OData-Service with local and remote (SAP-Backend) entities
* Subscription capabilities (without onboarding app)
* Access to destination service, also via connectivity service
  * Destination creation and deletion
  * Destination access
* automatic E2E tests
* Manual tests (e.g. batch mode)


## Migration preparation
The top-level `package.json` contains a script named `upgrade`, which allows upgrading all or selected dependencies within the approuter and backend project.
Proposal: Try upgrading dependencies all at once for minor upgrades and in case oif severe issues start from scratch upgrading dependencies in smaller groups - 
for major upgrades the latter seems to be more suitable.

## Migration guide
Whenever an upgrade is done, required changes or found/fixed issues should be documented inside [CDS-MIGRATION-GUIDE.md](./CDS-MIGRATION-GUIDE.md) for benefitting in real projects.

The migration section should:

* be identified by date
* contain the targetes package versions (`@sap/*`, `@sap-cloud-sdk/*` and if affected `@nestjs/*`)
* have a list of required changes pointing to each ones change description
* the respective change descriptions as short as possible, but as long as neccessary