import axios, {AxiosInstance} from 'axios';
import {BaseApiService} from './BaseApiService';
import {
  ContactCallRsp,
  FAQRsp,
  HelpRsp,
  RegionalOfficeRsp,
} from '../Domains/rsp/HelpRsp';
import {Any} from '../Types';
import {GLOBAL_CONFIG} from '../config';
import {get} from 'lodash';
/**
 * drupal help service
 */
export class DrupalHelpService extends BaseApiService {
  apiInstance: AxiosInstance;

  constructor() {
    super('drupal-help-service');
    this.apiInstance = axios.create();
  }

  /**
   * extract call info from rsp
   * @private
   */
  private extractCall(rsp: Any): ContactCallRsp[] {
    const typeKey = 'paragraph--contact_bank_call';
    const calls = (rsp.included || []).filter((i: Any) => i.type === typeKey);
    return calls.map((c: Any) => ({
      title: get(c, 'attributes.field_contact_title'),
      phone: get(c, 'attributes.field_telephone'),
      time: get(c, 'attributes.field_availablity_time'),
    }));
  }

  /**
   * extract office info from rsp
   * @private
   */
  private extractCallOffice(rsp: Any): RegionalOfficeRsp[] {
    const typeKey = 'paragraph--regional_office_address';
    const calls = (rsp.included || []).filter((i: Any) => i.type === typeKey);
    return calls.map((c: Any) => ({
      title: get(c, 'attributes.field_office_name'),
      workRange: get(c, 'attributes.field_working_days_time'),
      workDate: get(c, 'attributes.field_working_days_weekdays'),
      tip: get(c, 'attributes.field_working_days_tip'),
      addressLine1: get(c, 'attributes.field_office_address_line_1'),
      addressLine2: get(c, 'attributes.field_office_address_line_2'),
      address: [
        get(c, 'attributes.field_office_address_line_1'),
        get(c, 'attributes.field_office_address_line_2'),
      ]
        .filter((i) => !!i)
        .join('\n'),
      mapUrl: get(c, 'attributes.field_map_url'),
    }));
  }

  /**
   * extract FAQ info from rsp
   * @private
   */
  private extractFAQ(rsp: Any): FAQRsp[] {
    // faq
    const faqKey = 'paragraph--faq_info';
    const included = rsp.included || [];
    const faq = included.filter((i: Any) => i.type === faqKey);
    const ret: FAQRsp[] = [];
    faq.forEach((f: Any) => {
      const children = get(f, 'relationships.field_faq_list.data', []);
      children.forEach((c: Any) => {
        const child = included.find((r: Any) => r.id === c.id);
        if (child) {
          ret.push({
            name: get(f, 'attributes.field_name'),
            label: get(f, 'attributes.field_category_label'),
            q: get(child, 'attributes.field_title'),
            description: get(child, 'attributes.field_description'),
          });
        }
      });
    });

    // insight
    const insightKey = 'paragraph--insight_root';
    const iRoot = included.find((i: Any) => i.type === insightKey);
    if (iRoot) {
      const insights = get(
        iRoot,
        'relationships.field_insight_info_list.data',
        [],
      );
      insights.forEach((ip: Any) => {
        const parent = included.find((i: Any) => i.id === ip.id);
        if (!parent) {
          return;
        }
        const children = get(
          parent,
          'relationships.field_insight_list.data',
          [],
        );
        const list = children.map((child: Any) => {
          const fieldInsight = included.find((i: Any) => i.id === child.id);
          return get(fieldInsight, 'attributes.field_insight');
        });
        ret.push({
          name: get(iRoot, 'attributes.field_insight_name'),
          label: get(iRoot, 'attributes.field_insight_category_label'),
          q: get(parent, 'attributes.field_title_insight'),
          description: get(parent, 'attributes.field_insight_right_label'),
          contents: list,
        });
      });
    }
    return ret;
  }
  public async loadContent(): Promise<HelpRsp> {
    try {
      const rsp = await this.apiInstance.get(GLOBAL_CONFIG.HELP_DRUPAL_URL);
      return {
        call: this.extractCall(rsp.data),
        offices: this.extractCallOffice(rsp.data),
        FAQ: this.extractFAQ(rsp.data),
      };
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
}
