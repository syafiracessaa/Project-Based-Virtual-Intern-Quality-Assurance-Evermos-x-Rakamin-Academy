import http from 'k6/http';
import { check, sleep, group } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
const BASE_URL = 'https://reqres.in';

 
export const options = {
    vus : 1000,
    iterations : 3500,
    duration : '2s',

    thresholds : {
        http_req_failed: ['rate<0.01'], 
    http_req_duration: ['p(95)<200'], 
    }

};


    export default function () {
 
        group ('Create Data', function () {
            
            const res = http.post('https://reqres.in/api/users');
            const payload = JSON.stringify({
            
                "name": "morpheus",
                "job": "leader",
              
            });
            const params = {
            headers: {
            'Content-Type': 'application/json',
            },
            };
            const checkOutput = check(
            res,
            {
            'response code was 201': (res) => res.status == 201,
            },
            );
        });
        
              
    
        group ('Update Data', function () {
            
            const res = http.put('https://reqres.in/api/users');
const payload = JSON.stringify({
    
        "name": "morpheus",
        "job": "zion resident",
        
    
});
const params = {
headers: {
'Content-Type': 'application/json',
},
};
const checkOutput = check(
res,
{
'response code was 200': (res) => res.status == 200,
},
);
      });
    
      http.get('https://reqres.in/api/users');
        sleep(1);

    }
   

export function handleSummary(data) {
    return {
        "./report.html" : htmlReport(data)
    };
}