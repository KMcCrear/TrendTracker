import React, {useState,useEffect} from 'react';
import {Card,Space} from 'antd';
import getTweets from '../helpers/getTweets';
import getSentiment from '../helpers/getSentiment';
import { PieChart } from 'react-minimal-pie-chart';
import '../css/Dashboard.css'

const TweetInfo = (props)=>{
    const {tweets, search} = props;
    
    const sentiments= {
        positive: 5,
        neutral: 10,
        negative: 8
    }

    //uncomment the next block if you want to test the sentiment api - careful with the ammount of requests, we have only $18 credit

    // const [sentiments, setSentiments] = useState({});

    // useEffect(()=>{
    //     const getSentiments = async()=>{

    //         const sentimentsRequests = tweets.data.map((tweet)=>{
    //             return getSentiment(search, tweet.text)
    //         })
    //         const sentimentResponses = await Promise.all(sentimentsRequests);

    //         const sentimentsFiltered = {neutral:0, positive:0, negative:0}
    //         sentimentResponses.forEach((sentiment)=>{
    //             if(sentiment.includes('positive')){
    //                 sentimentsFiltered.positive += 1;
    //             }   else if(sentiment.includes('negative')){
    //                 sentimentsFiltered.negative += 1;
    //             }
    //             else if(sentiment.includes('neutral')){
    //                 sentimentsFiltered.neutral += 1;
    //             }
    //         }) 
    //         setSentiments(sentimentsFiltered);
    //     }

    // getSentiments();
    // },[tweets])

    return(
        <>

            <Space direction='horizontal'>
            <Card>
                <Space direction ='vertical'>
                    <h3>Opinion on twitter</h3>
                    <PieChart
                    style={{display:'inline-block'}}
                    label={({ dataEntry }) => `${dataEntry.title} - ${Math.round(dataEntry.percentage)} %`}
                    labelStyle={{fontSize: '3px'}}
                        data={[
                            { title: 'Positive', value: sentiments.positive, color: 'green' },
                            { title: 'Negative', value: sentiments.negative, color: 'red' },
                            { title: 'Neutral', value: sentiments.neutral, color: 'grey' },
                        ]}
                        />
                </Space>

             </Card>

            </Space>

        </>
    )
}

export default TweetInfo;