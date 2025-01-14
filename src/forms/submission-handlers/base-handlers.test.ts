import { EncounterContext } from '../ohri-form-context';
import { OHRIFormField } from '../types';
import { ObsSubmissionHandler } from './base-handlers';

const encounterContext: EncounterContext = {
  patient: {
    id: '833db896-c1f0-11eb-8529-0242ac130003',
  },
  location: {
    uuid: '41e6e516-c1f0-11eb-8529-0242ac130003',
  },
  encounter: {
    uuid: '873455da-3ec4-453c-b565-7c1fe35426be',
    obs: [],
  },
  sessionMode: 'enter',
  date: new Date(2020, 11, 29),
};

describe('ObsSubmissionHandler - handleFieldSubmission', () => {
  // new submission (enter mode)
  it('should handle submission for text input', () => {
    // setup
    const field: OHRIFormField = {
      label: 'Visit note',
      type: 'obs',
      questionOptions: {
        rendering: 'text',
        concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      },
      id: 'visit-note',
    };
    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(field, 'Can be discharged in next visit', encounterContext);
    // verify
    expect(obs).toEqual({
      person: '833db896-c1f0-11eb-8529-0242ac130003',
      obsDatetime: encounterContext.date,
      concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
      order: null,
      groupMembers: [],
      voided: false,
      value: 'Can be discharged in next visit',
    });
  });

  it('should handle submission for number input', () => {
    // setup
    const field: OHRIFormField = {
      label: 'Temperature',
      type: 'obs',
      questionOptions: {
        rendering: 'number',
        concept: '2c43u05b-b6d8-4eju-8f37-0b14f5347560',
      },
      id: 'temperature',
    };
    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(field, 36, encounterContext);
    // verify
    expect(obs).toEqual({
      person: '833db896-c1f0-11eb-8529-0242ac130003',
      obsDatetime: encounterContext.date,
      concept: '2c43u05b-b6d8-4eju-8f37-0b14f5347560',
      location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
      order: null,
      groupMembers: [],
      voided: false,
      value: 36,
    });
  });

  it('should handle submission for multiselect input', () => {
    // setup
    const field: OHRIFormField = {
      label: 'Past enrolled patient programs',
      type: 'obs',
      questionOptions: {
        rendering: 'checkbox',
        concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
      },
      id: 'past-patient-programs',
    };

    // replay
    // Select Oncology Screening and Diagnosis Program
    let obs = ObsSubmissionHandler.handleFieldSubmission(
      field,
      { checked: true, id: '105e7ad6-c1fd-11eb-8529-0242ac130ju9' },
      encounterContext,
    );

    // verify
    expect(obs).toEqual([
      {
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: '105e7ad6-c1fd-11eb-8529-0242ac130ju9',
      },
    ]);

    // replay
    // Add Fight Malaria Initiative
    obs = ObsSubmissionHandler.handleFieldSubmission(
      field,
      { checked: true, id: '305e7ad6-c1fd-11eb-8529-0242ac130003' },
      encounterContext,
    );

    // verify
    expect(obs).toEqual([
      {
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: '105e7ad6-c1fd-11eb-8529-0242ac130ju9',
      },
      {
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: '305e7ad6-c1fd-11eb-8529-0242ac130003',
      },
    ]);
  });

  it('should handle submission for date input', () => {
    // setup
    const field: OHRIFormField = {
      label: 'HTS Date',
      type: 'obs',
      questionOptions: {
        rendering: 'date',
        concept: 'j8b6705b-b6d8-4eju-8f37-0b14f5347569',
      },
      id: 'hts-date',
    };
    const htsDate = new Date(2019, 12, 20);
    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(field, htsDate, encounterContext);
    // verify
    expect(obs).toEqual({
      person: '833db896-c1f0-11eb-8529-0242ac130003',
      obsDatetime: encounterContext.date,
      concept: 'j8b6705b-b6d8-4eju-8f37-0b14f5347569',
      location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
      order: null,
      groupMembers: [],
      voided: false,
      value: htsDate,
    });
  });

  it('should handle submission for single-select inputs', () => {
    // setup
    const field: OHRIFormField = {
      label: 'HTS Result',
      type: 'obs',
      questionOptions: {
        rendering: 'content-switcher',
        concept: '89jbi9jk-b6d8-4eju-8f37-0b14f53mhj098b',
      },
      id: 'hts-result',
    };
    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(
      field,
      'n8hynk0j-c1fd-117g-8529-0242ac1hgc9j',
      encounterContext,
    );
    // verify
    expect(obs).toEqual({
      person: '833db896-c1f0-11eb-8529-0242ac130003',
      obsDatetime: encounterContext.date,
      concept: '89jbi9jk-b6d8-4eju-8f37-0b14f53mhj098b',
      location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
      order: null,
      groupMembers: [],
      voided: false,
      value: 'n8hynk0j-c1fd-117g-8529-0242ac1hgc9j',
    });
  });

  // editing existing values (edit mode)
  it('should edit obs text/number value in edit mode', () => {
    // setup
    encounterContext.sessionMode = 'edit';
    const field: OHRIFormField = {
      label: 'Visit note',
      type: 'obs',
      questionOptions: {
        rendering: 'text',
        concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      },
      value: {
        uuid: '305ed1fc-c1fd-11eb-8529-0242ac130003',
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: 'Can be discharged in next visit',
      },
      id: 'visit-note',
    };

    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(field, 'Discharged with minor symptoms', encounterContext);

    // verify
    expect(obs).toEqual({
      uuid: '305ed1fc-c1fd-11eb-8529-0242ac130003',
      person: '833db896-c1f0-11eb-8529-0242ac130003',
      obsDatetime: encounterContext.date,
      concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
      order: null,
      groupMembers: [],
      voided: false,
      value: 'Discharged with minor symptoms',
    });
  });

  it('should edit obs coded value in edit mode', () => {
    // setup
    encounterContext.sessionMode = 'edit';
    const field: OHRIFormField = {
      label: 'HTS Result',
      type: 'obs',
      questionOptions: {
        rendering: 'radio',
        concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      },
      value: {
        uuid: '305ed1fc-c1fd-11eb-8529-0242ac130003',
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: '5197ca4f-f0f7-4e63-9a68-8614224dce44',
      },
      id: 'hts-result',
    };
    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(
      field,
      'a7fd300b-f4b5-4cd1-94f8-915adf61a5e3',
      encounterContext,
    );
    // verify
    expect(obs).toEqual({
      uuid: '305ed1fc-c1fd-11eb-8529-0242ac130003',
      person: '833db896-c1f0-11eb-8529-0242ac130003',
      obsDatetime: encounterContext.date,
      concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
      order: null,
      groupMembers: [],
      voided: false,
      value: 'a7fd300b-f4b5-4cd1-94f8-915adf61a5e3',
    });
  });

  it('should edit obs value(s) from multiselect input component', () => {
    // setup
    encounterContext.sessionMode = 'edit';
    const field: OHRIFormField = {
      label: 'Past enrolled patient programs',
      type: 'obs',
      questionOptions: {
        rendering: 'checkbox',
        concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
      },
      value: [
        {
          uuid: 'f2487de5-e55f-4689-8791-0c919179818b',
          person: '833db896-c1f0-11eb-8529-0242ac130003',
          obsDatetime: encounterContext.date,
          concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
          location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
          order: null,
          groupMembers: [],
          voided: false,
          value: '105e7ad6-c1fd-11eb-8529-0242ac130ju9',
        },
      ],
      id: 'past-patient-programs',
    };

    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(
      field,
      { checked: true, id: '305e77c0-c1fd-11eb-8529-0242ac130003' },
      encounterContext,
    );

    // verify
    expect(obs).toEqual([
      {
        uuid: 'f2487de5-e55f-4689-8791-0c919179818b',
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: '105e7ad6-c1fd-11eb-8529-0242ac130ju9',
      },
      {
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: '305e77c0-c1fd-11eb-8529-0242ac130003',
      },
    ]);
  });

  it('should edit obs date value in edit mode', () => {
    // setup
    encounterContext.sessionMode = 'edit';
    const field: OHRIFormField = {
      label: 'HTS date',
      type: 'obs',
      questionOptions: {
        rendering: 'date',
        concept: '3e432ad5-7b19-4866-a68f-abf0d9f52a01',
      },
      value: {
        uuid: 'bca7277f-a726-4d3d-9db8-40937228ead5',
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '3e432ad5-7b19-4866-a68f-abf0d9f52a01',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: new Date(2020, 11, 16),
      },
      id: 'hts-date',
    };
    const newHtsDate = new Date(2021, 11, 16);
    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(field, newHtsDate, encounterContext);
    // verify
    expect(obs).toEqual({
      uuid: 'bca7277f-a726-4d3d-9db8-40937228ead5',
      person: '833db896-c1f0-11eb-8529-0242ac130003',
      obsDatetime: encounterContext.date,
      concept: '3e432ad5-7b19-4866-a68f-abf0d9f52a01',
      location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
      order: null,
      groupMembers: [],
      voided: false,
      value: newHtsDate,
    });
  });

  // deleting/voiding existing values (edit mode)
  it('should void deleted obs text/number value in edit mode', () => {
    // setup
    encounterContext.sessionMode = 'edit';
    const field: OHRIFormField = {
      label: 'Visit note',
      type: 'obs',
      questionOptions: {
        rendering: 'text',
        concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      },
      value: {
        uuid: '305ed1fc-c1fd-11eb-8529-0242ac130003',
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: 'Can be discharged in next visit',
      },
      id: 'visit-note',
    };

    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(field, '', encounterContext);

    // verify
    expect(obs).toEqual({
      uuid: '305ed1fc-c1fd-11eb-8529-0242ac130003',
      person: '833db896-c1f0-11eb-8529-0242ac130003',
      obsDatetime: encounterContext.date,
      concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
      order: null,
      groupMembers: [],
      voided: true,
      value: 'Can be discharged in next visit',
    });
  });

  it('should void deleted obs coded value in edit mode', () => {
    // setup
    encounterContext.sessionMode = 'edit';
    const field: OHRIFormField = {
      label: 'HTS Result',
      type: 'obs',
      questionOptions: {
        rendering: 'content-switcher',
        concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      },
      value: {
        uuid: '305ed1fc-c1fd-11eb-8529-0242ac130003',
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: '5197ca4f-f0f7-4e63-9a68-8614224dce44',
      },
      id: 'hts-result',
    };
    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(field, null, encounterContext);
    // verify
    expect(obs).toEqual({
      uuid: '305ed1fc-c1fd-11eb-8529-0242ac130003',
      person: '833db896-c1f0-11eb-8529-0242ac130003',
      obsDatetime: encounterContext.date,
      concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
      order: null,
      groupMembers: [],
      voided: true,
      value: '5197ca4f-f0f7-4e63-9a68-8614224dce44',
    });
  });

  it('should void deleted obs coded value(s) from a multiselect input component', () => {
    // setup
    encounterContext.sessionMode = 'edit';
    const field: OHRIFormField = {
      label: 'Past enrolled patient programs',
      type: 'obs',
      questionOptions: {
        rendering: 'checkbox',
        concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
      },
      value: [
        {
          uuid: 'f2487de5-e55f-4689-8791-0c919179818b',
          person: '833db896-c1f0-11eb-8529-0242ac130003',
          obsDatetime: encounterContext.date,
          concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
          location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
          order: null,
          groupMembers: [],
          voided: false,
          value: {
            uuid: '105e7ad6-c1fd-11eb-8529-0242ac130ju9',
          },
        },
      ],
      id: 'past-patient-programs',
    };

    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(
      field,
      { checked: false, id: '105e7ad6-c1fd-11eb-8529-0242ac130ju9' },
      encounterContext,
    );

    // verify
    expect(obs).toEqual([
      {
        uuid: 'f2487de5-e55f-4689-8791-0c919179818b',
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: true,
        value: {
          uuid: '105e7ad6-c1fd-11eb-8529-0242ac130ju9',
        },
      },
    ]);
  });

  it('should void deleted obs date value in edit mode', () => {
    // setup
    encounterContext.sessionMode = 'edit';
    const htsDate = new Date(2020, 11, 16);
    const field: OHRIFormField = {
      label: 'HTS date',
      type: 'obs',
      questionOptions: {
        rendering: 'date',
        concept: '3e432ad5-7b19-4866-a68f-abf0d9f52a01',
      },
      value: {
        uuid: 'bca7277f-a726-4d3d-9db8-40937228ead5',
        person: '833db896-c1f0-11eb-8529-0242ac130003',
        obsDatetime: encounterContext.date,
        concept: '3e432ad5-7b19-4866-a68f-abf0d9f52a01',
        location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
        order: null,
        groupMembers: [],
        voided: false,
        value: htsDate,
      },
      id: 'hts-date',
    };
    // replay
    const obs = ObsSubmissionHandler.handleFieldSubmission(field, '', encounterContext);
    // verify
    expect(obs).toEqual({
      uuid: 'bca7277f-a726-4d3d-9db8-40937228ead5',
      person: '833db896-c1f0-11eb-8529-0242ac130003',
      obsDatetime: encounterContext.date,
      concept: '3e432ad5-7b19-4866-a68f-abf0d9f52a01',
      location: { uuid: '41e6e516-c1f0-11eb-8529-0242ac130003' },
      order: null,
      groupMembers: [],
      voided: true,
      value: htsDate,
    });
  });
});

describe('ObsSubmissionHandler - getInitialValue', () => {
  it('should get initial value for text rendering', () => {
    // setup
    const field: OHRIFormField = {
      label: 'Visit note',
      type: 'obs',
      questionOptions: {
        rendering: 'text',
        concept: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      },
      id: 'visit-note',
    };
    encounterContext.encounter['obs'].push({
      uuid: '86a9366f-009b-40b7-b8ac-81fc6c4d7ca6',
      concept: {
        uuid: '1c43b05b-b6d8-4eb5-8f37-0b14f5347568',
      },
      value: 'Can be discharged in next visit',
    });
    // replay
    const initialValue = ObsSubmissionHandler.getInitialValue(encounterContext.encounter, field);
    // verify
    expect(initialValue).toBe('Can be discharged in next visit');
  });

  it('should get initial value for number rendering', () => {
    // setup
    const field: OHRIFormField = {
      label: 'Temperature',
      type: 'obs',
      questionOptions: {
        rendering: 'number',
        concept: '7928c3ab-4d14-471f-94a8-a12eaa59e29c',
      },
      id: 'temp',
    };
    encounterContext.encounter['obs'].push({
      uuid: '6ae85e6f-134d-48c2-b89a-8293d6ea7e3d',
      concept: {
        uuid: '7928c3ab-4d14-471f-94a8-a12eaa59e29c',
      },
      value: 37,
    });
    // replay
    const initialValue = ObsSubmissionHandler.getInitialValue(encounterContext.encounter, field);
    // verify
    expect(initialValue).toBe(37);
  });

  it('should get initial value for multicheckbox rendering', () => {
    // setup
    const field: OHRIFormField = {
      label: 'Past enrolled patient programs',
      type: 'obs',
      questionOptions: {
        rendering: 'checkbox',
        concept: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
      },
      id: 'past-patient-programs',
    };
    encounterContext.encounter['obs'].push(
      {
        uuid: 'f2487de5-e55f-4689-8791-0c919179818b',
        concept: {
          uuid: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
        },
        value: {
          uuid: '105e7ad6-c1fd-11eb-8529-0242ac130ju9',
        },
      },
      {
        uuid: '23fd1819-0eb2-4753-88d7-6fc015786c8d',
        concept: {
          uuid: '3hbkj9-b6d8-4eju-8f37-0b14f5347jv9',
        },
        value: {
          uuid: '6f337e18-5445-437f-8298-684a7067dc1c',
        },
      },
    );
    // replay
    const initialValue = ObsSubmissionHandler.getInitialValue(encounterContext.encounter, field);
    // verify
    expect(initialValue).toEqual(['105e7ad6-c1fd-11eb-8529-0242ac130ju9', '6f337e18-5445-437f-8298-684a7067dc1c']);
  });

  it('should get initial value for date rendering', () => {
    // setup
    const field: OHRIFormField = {
      label: 'HTS Date',
      type: 'obs',
      questionOptions: {
        rendering: 'date',
        concept: 'j8b6705b-b6d8-4eju-8f37-0b14f5347569',
      },
      id: 'hts-date',
    };
    encounterContext.encounter['obs'].push({
      uuid: '828cff78-2c38-4ed2-94f1-61c5f79dda17',
      concept: {
        uuid: 'j8b6705b-b6d8-4eju-8f37-0b14f5347569',
      },
      value: 'Sat Nov 19 2016 00:00:00 GMT+0300 (East Africa Time)',
    });
    // replay
    const initialValue = ObsSubmissionHandler.getInitialValue(encounterContext.encounter, field);
    // verify
    expect(initialValue).toEqual(new Date(2016, 10, 19));
  });

  it('should get initial value for coded input types', () => {
    // setup
    const field: OHRIFormField = {
      label: 'HTS Result',
      type: 'obs',
      questionOptions: {
        rendering: 'radio',
        concept: '4e59df68-9774-49b3-9d33-ab75139c6a68',
      },
      id: 'hts-result',
    };
    encounterContext.encounter['obs'].push({
      uuid: '305ed1fc-c1fd-11eb-8529-0242ac130003',
      concept: {
        uuid: '4e59df68-9774-49b3-9d33-ab75139c6a68',
      },
      value: {
        uuid: '12f7be3d-fb5d-47dc-b5e3-56c501be80a6',
      },
    });
    // replay
    const initialValue = ObsSubmissionHandler.getInitialValue(encounterContext.encounter, field);
    // verify
    expect(initialValue).toEqual('12f7be3d-fb5d-47dc-b5e3-56c501be80a6');
  });
});
