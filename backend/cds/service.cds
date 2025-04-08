using { proto } from './model';

service SampleService {
    @cds.persistence.skip
    entity Sample @readonly as projection on proto.Sample;

}
