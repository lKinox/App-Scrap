import './footer.css'
import { Text, Link } from '@geist-ui/core';
import { Code, Linkedin, Github, Mail, Smartphone } from '@geist-ui/icons'

function Footer() {
    return (
        <footer className='Footer'>
            <div className='Footer-row'>
                <ul>
                    <li>
                        <Link target="_blank" href="https://reyanj.netlify.app/">Portfolio Web <Code size={16}/></Link>
                    </li>
                    <li>
                        <Link target="_blank" href="https://github.com/lKinox">Github <Github size={16}/></Link>
                    </li>
                    <li>
                        <Link target="_blank" href="https://www.linkedin.com/in/reyan-jimenez-750bb7238/">LinkedIn <Linkedin size={16}/></Link>
                    </li>
                    <li>
                        <Link target="_blank" href="mailto:reyanjimenez@gmail.com">Email <Mail size={16}/></Link>
                    </li>
                    <li>
                        <Link target="_blank" href="https://wa.me/584122532702">Whatsapp <Smartphone size={16}/></Link>
                    </li>
                </ul>
                <Text p>Diseñado y desarrollado por <Link target="_blank" href="https://reyanj.netlify.app/">ReyanJ</Link></Text>
            </div>
        </footer> 
    )
}

export default Footer;