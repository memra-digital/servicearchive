export class ServiceAPI {
    greet() {
        console.log(`%cServiceAPI - console API for servicearchive!`, `font-weight: bold; font-size: 2rem;`);
        console.log(`%cFor help, use ServiceAPI.help().`, `font-weight: bold;`);
    }
    help() {
        console.log(`greet() - Show a greeting message
help() - Show this list
newService(name: string) - Add a service
renameService(id: number) - Rename a service by ID
search(phrase: string) - Find services based on search term
setServiceContent(id: number, content: string) - Set service content
getServiceContent(id: number) - Get service content by string
save() - Save all changes`);
    }

    newService(name: string) {

    }
    renameService(id: number) {

    }
    search(phrase: string) {
        
    }
    setServiceContent(id: number, content: string) {

    }
    getServiceContent(id: number) {

    }
    save() {
        
    }
}