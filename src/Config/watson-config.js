export default{
  ibm_api_key:'put-your-key-here',
  ibm_url:'put-your-ibm-url-here',
  constructSession:(ibm_assistant_id)=>{
      return `put-part-your-session-id-here/${ibm_assistant_id}/sessions`
  }
}
