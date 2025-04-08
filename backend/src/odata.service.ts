import { Injectable } from "@nestjs/common";
import { Service } from "@sap/cds";
import { AppService } from "./app.service";
import { Destination, getDestinationFromDestinationService, HttpDestinationOrFetchOptions } from "@sap-cloud-sdk/connectivity";

import cds from '@sap/cds';

/** Handles OData requests and orchestrates the respectiove service calls and transformation */
@Injectable()
export class ODataService {
    constructor(readonly appService: AppService) {
        cds.log('destination-accessor-service', 'debug');
    }

    /** CDS-OData-Handler instance which is invoked for each OData request  */
    serviceHandler = (srv: Service) => {
        
        srv.on('READ', 'Sample', async(_req) => {
            return [{id: "10001", name: "Sample1"}, {id: "10002", name: "Sample2"}]
        });  
    }
}