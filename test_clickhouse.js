var chai = require("chai");
var expect = chai.expect;
const Mocha = require('mocha');
const {findJobRecord,updateJob,addJobRecord,getData,executeQuery} = require("../Basic_Test/index.js");


async function myAsyncFunction_find(id) {
  try {
    const jobId = id;
    const result = await findJobRecord(jobId);
    return result;
  } catch (error) {
    console.error("Error in myAsyncFunction:", error);
    throw error;
  }
}

async function test_for_find(){
	//Test function for findJobRecord Function
	const output = [
  {
    JobID: '1',
    JobName: 'FirstJob',
    ParentID: '0',
    JobStatus: 'Completed',
    AttemptsMade: 1,
    AttemptsLimit: 1,
    JobStart: null
  }
];

const output1 = [
  {
    JobID: '1',
    JobName: 'SecondJob',
    ParentID: '0',
    JobStatus: 'Pending',
    AttemptsMade: 0,
    AttemptsLimit: 1,
    JobStart: null
  }
];
	describe('Test for find function',function(){
		it('Test Case 1',async function(){
			const result = await myAsyncFunction_find(1);
			expect(result).to.be.equal(output);
		});
		it('Test Case 2',async function(){
			const result = await myAsyncFunction_find(1);
			expect(result).to.be.equal(output1);
		});

	});
}

//test_for_find();

async function myAsyncFunction_update() {
  const result = await updateJob(0, "Pending", 1) ; // Using await when calling a function
  return result;
}

async function test_for_update(){
	const output_update = [
  	{
    	JobID: '1',
    	JobName: 'FirstJob',
    	ParentID: '0',
    	JobStatus: 'Pending',
    	AttemptsMade: 1,
    	AttemptsLimit: 1,
    	JobStart: null
  	}
	];
	describe('Test for update function',function(){
		it('True/False',async function(){
			const result = await myAsyncFunction_update();
			expect(result).to.be.equal(true);
		});
		describe('Inner test suite',function(){
			it('Value Comparison',async function(){
				const result1 = await myAsyncFunction_find(1);
				const r = [result1[0].AttemptsLimit,result1[0].JobStatus];
				console.log(r);
				const m = [output_update[0].AttemptsLimit,output_update[0].JobStatus];
				console.log(m);
				expect(r).to.be.deep.equal(m);
			});
		});
	});
}

//test_for_update();


async function myAsyncFunction_Add() {
  const result = await addJobRecord(3, "ThirdJob", 0,{},"Pending", 1,2, {});; // Using await when calling a function
  return result;
}

async function myAsyncFunction1(id){
		const jobId1 = id;
		//const findJobRecord = findJobRecord
  		const result = await findJobRecord(jobId1);
  		if(result[0].hasOwnProperty("JobID")){
  			if(result[0].JobID == jobId1){
  				return true;
  			}
  		}
  		return false;
  		//return result;
}

async function test_for_add(){
describe('Test for Add',function(){
	it('True/False',async function(){
		const result = await myAsyncFunction_Add();
		const result1 = await myAsyncFunction1(3);
		expect(result).to.be.equal(true);
		expect(result).to.be.equal(result1);
	});
	describe('Inner Test for Add ',function(){
		it('Values Comparison ',async function(){
			const result = await myAsyncFunction_Add();
			const result1 = await myAsyncFunction1(3);
			expect(result).to.be.deep.equal(result1);
		});
   });

});
}

//test_for_add();


async function myAsyncFunction_get() {
  const result = await getData("SELECT * FROM WorkflowEngine.JobManager WHERE JobID = '1';") 
  return result;
}

async function test_for_get(){
	const output_get = {
  		JobID: '1',
  		JobName: 'FirstJob',
  		ParentID: '0',
  		JobStatus: 'Pending',
  		AttemptsMade: 0,
  		AttemptsLimit: 1,
  		JobStart: null,
  		JobEnd: '2023-10-12 15:56:01'
	};
	describe('Test for Get',function(){
		it('Value Comparison',async function(){
			const result = await myAsyncFunction_get();
			expect(result[0]).to.be.deep.equal(output_get);
		});
	});
}

//test_for_get();


async function myAsyncFunction_execute() {
  const result = await executeQuery("SELECT * FROM WorkflowEngine.JobManager WHERE JobID = '1';") 
  return result;
}

async function test_for_execute(){
	const output_execute = {
  		JobID: '1',
  		JobName: 'FirstJob',
  		ParentID: '0',
  		JobStatus: 'Pending',
  		AttemptsMade: 0,
  		AttemptsLimit: 1,
  		JobStart: null,
  		JobEnd: '2023-10-12 15:56:01'
	};
	describe('Test for Get',function(){
		it('Value Comparison',async function(){
			const result = await myAsyncFunction_execute();
			expect(result[0]).to.be.deep.equal(output_execute);
		});
	});
}

//test_for_execute();