import React, {useState,useEffect} from 'react';
import {Card,Space} from 'antd';
import getTweets from '../helpers/getTweets';
import getSentiment from '../helpers/getSentiment';
import { PieChart } from 'react-minimal-pie-chart';


const TweetInfo = (props)=>{
    const {search} = props;
    
    const [sentiments, setSentiments] = useState({});

    useEffect(()=>{
        const getSentiments = async()=>{
            const newTweets = await getTweets(search.toUpperCase());

            const sentimentsRequests = newTweets.data.map((tweet)=>{
                return getSentiment(search, tweet.text)
            })
            const sentimentResponses = await Promise.all(sentimentsRequests);

            const sentimentsFiltered = {neutral:0, positive:0, negative:0}
            sentimentResponses.forEach((sentiment)=>{
                if(sentiment.includes('positive')){
                    sentimentsFiltered.positive += 1;
                }   else if(sentiment.includes('negative')){
                    sentimentsFiltered.negative += 1;
                }
                else if(sentiment.includes('neutral')){
                    sentimentsFiltered.neutral += 1;
                }
            }) 
            setSentiments(sentimentsFiltered);
        }

    getSentiments();
    },[search])

    return(
        <Card>
            <Space>
            <PieChart
                data={[
                    { title: 'Positive', value: sentiments.positive, color: 'green' },
                    { title: 'Negative', value: sentiments.negative, color: 'red' },
                    { title: 'Neutral', value: sentiments.neutral, color: 'grey' },
                ]}
                />;
            </Space>
        </Card>
    )
}

export default TweetInfo;