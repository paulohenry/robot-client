export default{
  ibm_api_key:'sdRf69T2iu9ME6XpQnnp0wOEdgYtDsA5HjCrIxReACtt',
  ibm_url:'https://api.us-south.assistant.watson.cloud.ibm.com/instances/671853fe-cf5b-4368-a811-fa173a2079c3',
  constructSession:(ibm_assistant_id)=>{
      return `https://api.us-south.assistant.watson.cloud.ibm.com/instances/671853fe-cf5b-4368-a811-fa173a2079c3/v2/assistants/${ibm_assistant_id}/sessions`
  }
}